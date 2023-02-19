import { API_URL } from "../constants/api";
import {
  Link,
} from "../data/models/Link";
import { handleErrors } from "./handleErrors";

export const fetchLinkDetails = async (): Promise<Link> => {
  const response = await fetch(`${API_URL}/chart/links`, {
    headers: { "content-type": "application/json" },
  });
  await handleErrors(response);

  return await response.json();
};

export const createLinkDetails = async (
  link: Link,
): Promise<Link> => {
  const response = await fetch(`${API_URL}/chart/links_post`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ link }),
  });
  await handleErrors(response);

  return await response.json();
};