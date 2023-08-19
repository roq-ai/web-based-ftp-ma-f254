import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPermission } from 'apiSdk/permissions';
import { permissionValidationSchema } from 'validationSchema/permissions';
import { FtpAccountInterface } from 'interfaces/ftp-account';
import { UserInterface } from 'interfaces/user';
import { getFtpAccounts } from 'apiSdk/ftp-accounts';
import { getUsers } from 'apiSdk/users';
import { PermissionInterface } from 'interfaces/permission';

function PermissionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PermissionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPermission(values);
      resetForm();
      router.push('/permissions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PermissionInterface>({
    initialValues: {
      can_upload: false,
      can_download: false,
      can_delete: false,
      can_update: false,
      ftp_account_id: (router.query.ftp_account_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: permissionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Permissions',
              link: '/permissions',
            },
            {
              label: 'Create Permission',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Permission
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl
            id="can_upload"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.can_upload}
          >
            <FormLabel htmlFor="switch-can_upload">Can Upload</FormLabel>
            <Switch
              id="switch-can_upload"
              name="can_upload"
              onChange={formik.handleChange}
              value={formik.values?.can_upload ? 1 : 0}
            />
            {formik.errors?.can_upload && <FormErrorMessage>{formik.errors?.can_upload}</FormErrorMessage>}
          </FormControl>

          <FormControl
            id="can_download"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.can_download}
          >
            <FormLabel htmlFor="switch-can_download">Can Download</FormLabel>
            <Switch
              id="switch-can_download"
              name="can_download"
              onChange={formik.handleChange}
              value={formik.values?.can_download ? 1 : 0}
            />
            {formik.errors?.can_download && <FormErrorMessage>{formik.errors?.can_download}</FormErrorMessage>}
          </FormControl>

          <FormControl
            id="can_delete"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.can_delete}
          >
            <FormLabel htmlFor="switch-can_delete">Can Delete</FormLabel>
            <Switch
              id="switch-can_delete"
              name="can_delete"
              onChange={formik.handleChange}
              value={formik.values?.can_delete ? 1 : 0}
            />
            {formik.errors?.can_delete && <FormErrorMessage>{formik.errors?.can_delete}</FormErrorMessage>}
          </FormControl>

          <FormControl
            id="can_update"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.can_update}
          >
            <FormLabel htmlFor="switch-can_update">Can Update</FormLabel>
            <Switch
              id="switch-can_update"
              name="can_update"
              onChange={formik.handleChange}
              value={formik.values?.can_update ? 1 : 0}
            />
            {formik.errors?.can_update && <FormErrorMessage>{formik.errors?.can_update}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<FtpAccountInterface>
            formik={formik}
            name={'ftp_account_id'}
            label={'Select Ftp Account'}
            placeholder={'Select Ftp Account'}
            fetcher={getFtpAccounts}
            labelField={'username'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/permissions')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'permission',
    operation: AccessOperationEnum.CREATE,
  }),
)(PermissionCreatePage);
