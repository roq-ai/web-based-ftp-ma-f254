const mapping: Record<string, string> = {
  companies: 'company',
  files: 'file',
  'ftp-accounts': 'ftp_account',
  members: 'member',
  permissions: 'permission',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
