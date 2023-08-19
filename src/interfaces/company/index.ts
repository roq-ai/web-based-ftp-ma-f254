import { FtpAccountInterface } from 'interfaces/ftp-account';
import { MemberInterface } from 'interfaces/member';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  ftp_account?: FtpAccountInterface[];
  member?: MemberInterface[];
  user?: UserInterface;
  _count?: {
    ftp_account?: number;
    member?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
