import { FtpAccountInterface } from 'interfaces/ftp-account';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PermissionInterface {
  id?: string;
  ftp_account_id?: string;
  user_id?: string;
  can_upload: boolean;
  can_download: boolean;
  can_delete: boolean;
  can_update: boolean;
  created_at?: any;
  updated_at?: any;

  ftp_account?: FtpAccountInterface;
  user?: UserInterface;
  _count?: {};
}

export interface PermissionGetQueryInterface extends GetQueryInterface {
  id?: string;
  ftp_account_id?: string;
  user_id?: string;
}
