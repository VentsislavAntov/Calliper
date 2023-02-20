import { atom, useAtom } from "jotai";

const emailExpired = atom(localStorage.getItem("emailExpired") ?? "");

const persistentEmailExpiredAtom = atom(
  (get) => get(emailExpired),
  (_, set, update: string) => {
    set(emailExpired, update);
    localStorage.setItem("emailExpired", update);
  }
);

export const useExpireDateStorage = () => {
  const [hasEmailExpired, setHasEmailExpired] = useAtom(persistentEmailExpiredAtom);

  return { hasEmailExpired, setHasEmailExpired};
};
