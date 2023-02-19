import { Link } from 'models/Link';
import { createLinkDetails, get } from './linkDetailsRepository';

describe('linkDetailsRepository', () => {
  it('should throw an error if link object has no email', () => {
    const link: any = { expiringDateTime: '3333-03-31T11:11' };
    expect(() => createLinkDetails(link)).toThrowError(
      'Link object has no email',
    );
    expect(get()).toBeNull();
  });

  it('should throw an error if link object has no expiringDateTime', () => {
    const link: any = { email: 'test@email.com' };
    expect(() => createLinkDetails(link)).toThrowError(
      'Link object has no expiringDate',
    );
    expect(get()).toBeNull();
  });

  it('should create and return the link details', () => {
    const link: Link = {
      email: 'test@email.com',
      expiringDateTime: '3333-03-31T11:11',
    };
    const result = createLinkDetails(link);
    expect(result).toEqual(link);
    expect(get()).toEqual(link);
  });

  it('should create and return the link details even if they already exist', () => {
    const link2: Link = {
      email: 'test2@email.com',
      expiringDateTime: '2222-03-31T11:11',
    };
    const result = createLinkDetails(link2);
    expect(result).toEqual(link2);
    expect(get()).toEqual(link2);
  });
});
