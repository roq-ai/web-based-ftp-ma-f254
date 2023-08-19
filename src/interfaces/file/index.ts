import { FtpAccountInterface } from 'interfaces/ftp-account';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FileInterface {
  id?: string;
  name: string;
  size: number;
  uploaded_at: any;
  ftp_account_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  ftp_account?: FtpAccountInterface;
  user?: UserInterface;
  _count?: {};
}

export interface FileGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  ftp_account_id?: string;
  user_id?: string;
}
