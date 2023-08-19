import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { ftpAccountValidationSchema } from 'validationSchema/ftp-accounts';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFtpAccounts();
    case 'POST':
      return createFtpAccount();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFtpAccounts() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.ftp_account
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'ftp_account'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createFtpAccount() {
    await ftpAccountValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.file?.length > 0) {
      const create_file = body.file;
      body.file = {
        create: create_file,
      };
    } else {
      delete body.file;
    }
    if (body?.permission?.length > 0) {
      const create_permission = body.permission;
      body.permission = {
        create: create_permission,
      };
    } else {
      delete body.permission;
    }
    const data = await prisma.ftp_account.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
