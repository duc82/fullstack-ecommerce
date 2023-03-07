const regexPhoneVN = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const regexEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export type ErrorForm = {
  [key: string]: any;
};

const validateForm = (values: ErrorForm) => {
  const error = {} as ErrorForm;

  const { fullName, phone, email, password } = values;

  if (!fullName) {
    error.fullName = "Họ và tên không được trống.";
  }

  if (!phone) {
    error.phone = "Số điện thoại không được bỏ trống.";
  } else if (!regexPhoneVN.test(phone)) {
    error.phone = "Số điện thoại không đúng.";
  }

  if (!email) {
    error.email = "Email không được bỏ trống.";
  } else if (!regexEmail.test(email)) {
    error.email = "Sai định dạng email.";
  }

  if (!password) {
    error.password = "Mật khẩu không được bỏ trống.";
  } else if (password.length < 8) {
    error.password = "Mật khẩu phải tối thiểu 8 kí tự.";
  }

  for (const key in values) {
    if (Object.prototype.hasOwnProperty.call(error, key)) {
      return error;
    }
  }
};

interface ValueEachField {
  value: string;
  value2?: string;
  name: string;
}

const validateFormEachField = (values: ValueEachField) => {
  const { value, value2, name } = values;

  switch (name) {
    case "fullName":
      if (!value) {
        return "Họ và tên không được trống.";
      }
      break;
    case "phone":
      if (!value) {
        return "Số điện thoại không được bỏ trống.";
      } else if (!regexPhoneVN.test(value)) {
        return "Số điện thoại không đúng.";
      }
      break;
    case "email":
      if (!value) {
        return "Email không được bỏ trống.";
      } else if (!regexEmail.test(value)) {
        return "Sai định dạng email.";
      }
      break;
    case "password":
      if (!value) {
        return "Mật khẩu không được bỏ trống.";
      } else if (value.length < 8) {
        return "Mật khẩu phải tối thiểu 8 kí tự.";
      }
      break;
    case "rePassword":
      if (value !== value2) {
        return "Xác nhận mật khẩu không giống với mật khẩu mới";
      }
      break;

    default:
      return "";
  }
};

export { validateForm, validateFormEachField };
