import * as yup from 'yup';

export const ftpAccountValidationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  status: yup.string().required(),
  company_id: yup.string().nullable(),
});
