import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Promotion from "./pages/Promotion";
import Showroom from "./pages/Showroom";
import Product from "./pages/Product";
import { Menus } from "./data/Menus";
import ProductOverview from "./pages/ProductOverview";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import useUrlChange from "./hooks/useUrlChange";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ChildrenProps } from "./types/types";
import { useAppSelector } from "./hooks/redux";
import SignOut from "./pages/SignOut";
import PageLayout from "./layouts/PageLayout";
import { useDispatch } from "react-redux";
import { resetAuth } from "./redux/reducers/authSlice";
import { verifyRecovery } from "./services/auth";
import Container from "./components/Container/Container";
import Test from "./pages/Test";

const ProductSubmenus = Menus[1].submenu;

const RequireAuth = ({
  children,
  redirectTo,
}: ChildrenProps & { redirectTo: string }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }
  return <>{children}</>;
};

const CleanState = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch, pathname]);

  return <Outlet />;
};

const VerifyRecovery = () => {
  const [urlSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const email = urlSearchParams.get("email");
  const token = urlSearchParams.get("token");

  useEffect(() => {
    if (email && token) {
      verifyRecovery(
        `${import.meta.env.VITE_API}/api/auth/verifyRecovery`,
        {
          token: urlSearchParams.get("token"),
          email: urlSearchParams.get("email"),
        },
        dispatch
      );
    }
  }, [urlSearchParams, dispatch, email, token]);

  if (!(urlSearchParams.get("email") || urlSearchParams.get("token"))) {
    return (
      <Container className="my-10">
        Đường link không hợp lệ hoặc đã hết hạn.
      </Container>
    );
  } else if (error) {
    return <Container className="my-10">{error}</Container>;
  }

  return <Outlet />;
};

const App = () => {
  useUrlChange();
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        {ProductSubmenus?.map((menu, i) => {
          return (
            <Route
              key={i}
              path={menu.url}
              element={<Product title={menu.value} />}
            />
          );
        })}

        <Route path=":productName" element={<ProductOverview />} />
        <Route
          path="tat-ca-san-pham"
          element={<Product title="Tất cả sản phẩm" />}
        />
        <Route path="test" element={<Test />} />
        <Route
          path="tai-khoan"
          element={
            <RequireAuth redirectTo="/dang-nhap">
              <Account />
            </RequireAuth>
          }
        />

        <Route element={<CleanState />}>
          <Route path="dang-ky" element={<SignUp />} />
          <Route path="dang-nhap" element={<SignIn />} />
          <Route path="quen-mat-khau" element={<ForgotPassword />} />
          <Route element={<VerifyRecovery />}>
            <Route path="doi-mat-khau" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route
          path="dang-xuat"
          element={
            <RequireAuth redirectTo="/dang-nhap">
              <SignOut />
            </RequireAuth>
          }
        />
        <Route path="gio-hang" element={<div>Gio hang</div>} />
        <Route path="tin-tuc" element={<Blog />} />
        <Route path="khuyen-mai" element={<Promotion />} />
        <Route path="he-thong-cua-hang" element={<Showroom />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
