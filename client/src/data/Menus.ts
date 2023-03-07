import { Cube, Heart, Location, User, UserPlus } from "../icons/icons";

export const Menus = [
  {
    url: "/",
    value: "Trang chủ",
  },
  {
    url: "/tat-ca-san-pham",
    value: "Sản phẩm",
    submenu: [
      {
        url: "/cac-loai-noi",
        value: "Các loại nồi",
      },
      {
        url: "/do-suoi",
        value: "Đồ sưởi",
      },
      {
        url: "/quat-cac-loai",
        value: "Quạt, Máy làm mát",
      },
      {
        url: "/may-xay-da-nang",
        value: "Máy xay đa năng",
      },
      {
        url: "/may-hut-bui",
        value: "Máy hút bụi",
      },
      {
        url: "/may-pha-ca-phe",
        value: "Máy pha cà phê",
      },
      {
        url: "/cay-nuoc-nong-lanh",
        value: "Cây nước nóng lạnh",
      },
      {
        url: "/do-dung-nha-bep",
        value: "Đồ dùng nhà bếp",
      },
      {
        url: "/cac-loai-bep",
        value: "Các loại bếp",
      },
      {
        url: "/lo-vi-song",
        value: "Lò vi sóng",
      },
      {
        url: "/lo-nuong-bep-nuong",
        value: "Lò nướng, Bếp nướng",
      },
      {
        url: "/may-loc-nuoc",
        value: "Máy lọc nước",
      },
      {
        url: "/binh-thuy-dien",
        value: "Bình thủy điện",
      },
      {
        url: "/noi-lau-bep-lau",
        value: "Nồi lẩu, Bếp lẩu",
      },
      {
        url: "/hop-com-giu-nhiet",
        value: "Hộp cơm giữ nhiệt",
      },
    ],
  },
  {
    url: "/tin-tuc",
    value: "Blog",
    submenu: [
      {
        url: "/cham-soc-suc-khoe",
        value: "Chăm sóc sức khỏe",
      },
      {
        url: "/kinh-nghiem-nau-an",
        value: "Kinh nghiệm nấu ăn",
      },
      {
        url: "/khach-hang-cua-chung-toi",
        value: "Khách hàng của chúng tôi",
      },
    ],
  },
  {
    url: "/khuyen-mai",
    value: "Khuyến mại",
    submenu: [
      {
        url: "/khuyen-mai-123",
        value: "Khuyến mại 123",
      },
    ],
  },
  {
    url: "/he-thong-cua-hang",
    value: "Showroom",
  },
];

export const BottomMenus = [
  {
    url: "/dang-nhap",
    value: "Đăng nhập",
    Icon: User,
  },
  {
    url: "/dang-ky",
    value: "Đăng ký",
    Icon: UserPlus,
  },
  { url: "/danh-sach-yeu-thich", value: "Danh sách yêu thích", Icon: Heart },
  { url: "/he-thong-cua-hang", value: "Hệ thống cửa hàng", Icon: Location },
  { url: "/kiem-tra-don-hang", value: "Theo dõi đơn hàng", Icon: Cube },
];
