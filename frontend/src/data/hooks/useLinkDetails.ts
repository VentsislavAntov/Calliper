import { useEffect } from "react";
import { useAtom } from "jotai";
import { fetchLinkDetailsAtom } from "../atoms/linkDetails";

export const useLinkDetails = () => {
  const [linkDetails, fetchLinkDetails] = useAtom(
    fetchLinkDetailsAtom
  );

  useEffect(() => {
    fetchLinkDetails();
  }, [fetchLinkDetails]);

  return linkDetails;
};
