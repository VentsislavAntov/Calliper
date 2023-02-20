  import DOMPurify from 'dompurify';

  export const sanitize = (text: string) => {
    return DOMPurify.sanitize(text);
  }