import * as yup from 'yup';

export const loginSchema = () =>
  yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

export const forgotSchema = () =>
  yup.object().shape({
    email: yup.string().email().required(),
  });

export const resetSchema = () =>
  yup.object({
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
