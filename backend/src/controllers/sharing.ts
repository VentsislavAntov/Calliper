import { Request, Response } from 'express';
import * as dataService from 'services/data/dataService';
import * as sharingService from 'services/sharing/sharingService';
import { BadRequestError } from 'utils/errors';

export const getShareToken = async (_: Request, res: Response) => {
  const token = sharingService.getShareToken();
  res.status(200).send({ token });
};

export const getSharedData = async (
  req: Request<{ token: string }>,
  res: Response,
) => {
  try {
    sharingService.validateToken(req.params.token);
    const data = dataService.getChartData();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    throw new BadRequestError('Failed to get shared data');
  }
};
