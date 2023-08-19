interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Member', 'Owner'],
  tenantName: 'Company',
  applicationName: 'web based ftp management',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
