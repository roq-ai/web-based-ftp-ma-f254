import { CompanyInterface } from 'interfaces/company';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MemberInterface {
  id?: string;
  joined_at: any;
  left_at?: any;
  status: string;
  company_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  user?: UserInterface;
  _count?: {};
}

export interface MemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  company_id?: string;
  user_id?: string;
}
