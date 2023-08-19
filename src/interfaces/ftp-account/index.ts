import { FileInterface } from 'interfaces/file';
import { PermissionInterface } from 'interfaces/permission';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface FtpAccountInterface {
  id?: string;
  username: string;
  password: string;
  status: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  file?: FileInterface[];
  permission?: PermissionInterface[];
  company?: CompanyInterface;
  _count?: {
    file?: number;
    permission?: number;
  };
}

export interface FtpAccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  username?: string;
  password?: string;
  status?: string;
  company_id?: string;
}
