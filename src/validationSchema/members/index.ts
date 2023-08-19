import * as yup from 'yup';

export const memberValidationSchema = yup.object().shape({
  joined_at: yup.date().required(),
  left_at: yup.date().nullable(),
  status: yup.string().required(),
  company_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
