import * as yup from "yup";

export const authSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters")
    .test(
      "password",
      "Password must contain at least one uppercase letter",
      (password) => {
        const capitalLetter = /[A-Z]/.test(password);
        if (!capitalLetter) {
          return false;
        }
        return true;
      }
    )
    .test(
      "password",
      "Password must contain at least one lowercase letter",
      (password) => {
        const lowercaseLetter = /[a-z]/.test(password);
        if (!lowercaseLetter) {
          return false;
        }
        return true;
      }
    )
    .test(
      "password",
      "Password must contain at least one special character",
      (password) => {
        const specialCharacter = /[!@#$%^&*-=]/.test(password);
        if (!specialCharacter) {
          return false;
        }
        return true;
      }
    ),
});
