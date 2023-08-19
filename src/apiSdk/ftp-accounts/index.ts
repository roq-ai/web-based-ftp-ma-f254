import axios from 'axios';
import queryString from 'query-string';
import { FtpAccountInterface, FtpAccountGetQueryInterface } from 'interfaces/ftp-account';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFtpAccounts = async (
  query?: FtpAccountGetQueryInterface,
): Promise<PaginatedInterface<FtpAccountInterface>> => {
  const response = await axios.get('/api/ftp-accounts', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFtpAccount = async (ftpAccount: FtpAccountInterface) => {
  const response = await axios.post('/api/ftp-accounts', ftpAccount);
  return response.data;
};

export const updateFtpAccountById = async (id: string, ftpAccount: FtpAccountInterface) => {
  const response = await axios.put(`/api/ftp-accounts/${id}`, ftpAccount);
  return response.data;
};

export const getFtpAccountById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/ftp-accounts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFtpAccountById = async (id: string) => {
  const response = await axios.delete(`/api/ftp-accounts/${id}`);
  return response.data;
};
