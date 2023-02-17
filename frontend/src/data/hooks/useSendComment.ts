import { useAtom, useSetAtom } from "jotai";
import {
  commentPublishingErrorAtom,
  publishCommentAtom,
} from "../atoms/sendComment";

export const usePublishComment = () => {
  const publishComment = useSetAtom(publishCommentAtom);
  const [commentError] = useAtom(commentPublishingErrorAtom);

  return { publishComment, commentError };
};
