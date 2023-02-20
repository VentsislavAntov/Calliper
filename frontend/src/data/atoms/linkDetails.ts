import { atom } from "jotai";
import { fetchLinkDetails } from "../../api/linkDetails";
import { Link } from "../models/Link";

export const LinkDetailsAtom = atom<Link | null>(null);

export const fetchLinkDetailsAtom = atom(
  (get) => get(LinkDetailsAtom),
  async (_, set) => {
    const link = await fetchLinkDetails();
    set(LinkDetailsAtom, link);
  }
);
