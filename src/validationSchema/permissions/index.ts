import * as yup from 'yup';

export const permissionValidationSchema = yup.object().shape({
  can_upload: yup.boolean().required(),
  can_download: yup.boolean().required(),
  can_delete: yup.boolean().required(),
  can_update: yup.boolean().required(),
  ftp_account_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
