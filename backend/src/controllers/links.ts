import { z } from 'zod';
import { Request, Response } from 'express';
import * as linkService from 'services/links/linkService';
import { parseItemStrict } from 'utils/parseItems';
import { Link } from 'models/Link';

const CreateLinkDetails = z.object({
  link: Link,
});

export const getAllLinkDetails = (_: Request, res: Response) => {
  const link = linkService.getLinkDetails();
  res.status(200).send(link);
};

export const createLinkDetails = (req: Request, res: Response) => {
  const { link } = parseItemStrict(CreateLinkDetails, req.body);

  const linkResult = linkService.createLinkDetail(link);
  res.status(200).send(linkResult);
};
