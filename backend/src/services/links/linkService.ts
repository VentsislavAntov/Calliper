import * as linkDetailsRepository from 'repositories/linkDetailsRepository';
import { Link } from 'models/Link';

export const getLinkDetails = () => {
  return linkDetailsRepository.get();
};

export const createLinkDetail = (link: Link) => {
  return linkDetailsRepository.createLinkDetails(link);
};
