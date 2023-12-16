import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup.string().email('Invalid email').required('Required field'),
    password: yup.string().required('Required field'),
  })
  .required();

export const registerSchema = yup
  .object({
    username: yup.string().required('Required field'),
    email: yup.string().email('Invalid email').required('Required field'),
    password: yup.string().required('Required field'),
  })
  .required();

export const bookLessonSchema = yup
  .object({
    reason: yup.string(),
    fullname: yup.string().required('Required field'),
    email: yup.string().email('Invalid email').required('Required field'),
    phone: yup.string().required('Required field'),
  })
  .required();
