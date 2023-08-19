import * as yup from 'yup';

export const fileValidationSchema = yup.object().shape({
  name: yup.string().required(),
  size: yup.number().integer().required(),
  uploaded_at: yup.date().required(),
  ftp_account_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
