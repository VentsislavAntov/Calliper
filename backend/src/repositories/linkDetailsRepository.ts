import { Link } from 'models/Link';
import { InternalError } from 'utils/errors';

let linkDetails: Link | null = null;

export const get = (): Link | null => {
  return linkDetails;
};

export const createLinkDetails = (link: Link): Link => {
  if (!link.email) {
    throw new InternalError('Link object has no email');
  }

  if (!link.expiringDateTime) {
    throw new InternalError('Link object has no expiringDate');
  }

  linkDetails = link;

  return linkDetails;
};
