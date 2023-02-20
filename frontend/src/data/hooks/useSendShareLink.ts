import { useAtom, useSetAtom } from "jotai";
import {
  linkPublishingErrorAtom,
  publishLinkAtom,
} from "../atoms/sendLink";

export const useSendShareLink = () => {
  const publishLink = useSetAtom(publishLinkAtom);
  const [linkError] = useAtom(linkPublishingErrorAtom);

  return { publishLink, linkError };
};
