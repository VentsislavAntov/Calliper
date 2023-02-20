import { z } from 'zod';
import { Request, Response } from 'express';
import * as linkService from 'services/links/linkService';
import { parseItemStrict } from 'utils/parseItems';
import { Link } from 'models/Link';
import { BadRequestError } from 'utils/errors';

const CreateLinkDetails = z.object({
  link: Link,
});

export const getAllLinkDetails = (_: Request, res: Response) => {
  const link = linkService.getLinkDetails();
  res.status(200).send(link);
};

export const createLinkDetails = (req: Request, res: Response) => {
  try {
    const { link } = parseItemStrict(CreateLinkDetails, req.body);

    const linkResult = linkService.createLinkDetail(link);

    res.status(200).send(linkResult);
  } catch (error) {
    console.error(error);

    if (error instanceof BadRequestError) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
};
