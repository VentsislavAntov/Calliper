import { Code, Heading, Link } from "@chakra-ui/react";
import { useSharingLink } from "../../data/hooks/useSharingLink";
import { SideMenu } from "./SideMenu";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ShareForm } from "../shareLink/ShareForm";
import './ShareMenu.css'

interface ShareMenuProps {
  show: boolean;
}

export const ShareMenu = ({ show }: ShareMenuProps) => {
  const link = useSharingLink();
  const [copied, setCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const copyLink = () => {
    if (!link) return;

    try {
      navigator.clipboard.writeText(link);
    } catch (error) {
      console.error(error);
    }
    setCopied(true);
  };

  useEffect(() => {
    setCopied(false);
  }, [show]);
  return (
    <SideMenu show={show}>
      <Heading size="md" pb={3}>
        Share Form
      </Heading>
      <ShareForm setShowLink={setShowLink}/>
      {showLink ? 
      <div className="linkWrapper">
        <div className="text">
          Restricted Access Link:
        </div>
        <Code
          className="link"
          p="8px"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          cursor="pointer"
          onClick={copyLink}
        >
          <Link maxWidth="100%">{link}</Link>
          {copied ? <CheckIcon color="green" /> : <CopyIcon />}
        </Code>
      </div>
      : null}
    </SideMenu>
  );
};
