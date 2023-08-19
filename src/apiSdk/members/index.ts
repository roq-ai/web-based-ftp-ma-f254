import axios from 'axios';
import queryString from 'query-string';
import { MemberInterface, MemberGetQueryInterface } from 'interfaces/member';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMembers = async (query?: MemberGetQueryInterface): Promise<PaginatedInterface<MemberInterface>> => {
  const response = await axios.get('/api/members', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createMember = async (member: MemberInterface) => {
  const response = await axios.post('/api/members', member);
  return response.data;
};

export const updateMemberById = async (id: string, member: MemberInterface) => {
  const response = await axios.put(`/api/members/${id}`, member);
  return response.data;
};

export const getMemberById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/members/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMemberById = async (id: string) => {
  const response = await axios.delete(`/api/members/${id}`);
  return response.data;
};
