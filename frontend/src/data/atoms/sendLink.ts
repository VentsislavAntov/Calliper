import { atom } from "jotai";
import { createLinkDetails } from "../../api/linkDetails";
import { Link } from "../models/Link";
import { fetchLinkDetailsAtom } from "./linkDetails";

export const linkPublishingErrorAtom = atom<string | null>(null);
export const publishLinkAtom = atom(
  null,
  async (get, set, link: Link) => {
    set(linkPublishingErrorAtom, null);
    try {
      const newLinkDetail = await createLinkDetails(link);
      set(fetchLinkDetailsAtom, (state: any) => [...state, newLinkDetail]);
    } catch (error: any) {
      set(linkPublishingErrorAtom, error.message);
    }
  }
);