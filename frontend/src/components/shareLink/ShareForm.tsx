import { Button, Input, Text, VStack } from "@chakra-ui/react";
import { SyntheticEvent, useCallback, useState } from "react";
import { useSendShareLink } from "../../data/hooks/useSendShareLink";
import { formatDateTime } from '../../helper/formatDateTime';
import { sanitize } from '../../helper/sanitize';

import './ShareForm.css'

interface ShareFormProps {
  setShowLink: (prop: boolean) => void;
}

export const ShareForm: React.FC<ShareFormProps> = ({ setShowLink }) => {
  const [shareEmail, setShareEmail] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { publishLink, linkError } = useSendShareLink();

  /**
   * The standard input component of type email from chakra does not test if there is a dot in the email
   * so this is an additional check for valid input
   * @param email 
   * @returns 
   */
    const isValidEmail = useCallback((email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }, []);

  /**
   * 
   * @param dateString This is an additional check for valid date from a logical perspective.
   * Input-wise, chakra already mandates correct behaviour.
   * @returns 
   */
  const isDateBetween2000And2100 = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year >= 2000 && year < 2100;
  };

  const submit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      setErrorMessage('');
      if (!isValidEmail(shareEmail)) {
        setSuccessMessage('');
        setErrorMessage('Email format is incorrect');
        return;
      }
      if (!isDateBetween2000And2100(date)) {
        setSuccessMessage('');
        setErrorMessage('Date is not between 2000 and 2100');
        return;
      }
      await publishLink({ email: shareEmail, expiringDateTime: date});
      setShowLink(true);
      setShareEmail("");
      setDate("");
      setSuccessMessage(`${shareEmail} now has access until ${formatDateTime(date)}`);
    },
    [isValidEmail, shareEmail, date, publishLink, setShowLink]
  );

  return (
    <VStack minHeight="200px" pt="2" as="form" onSubmit={submit}>
      <div className="text">
        Receiving email:
      </div>
      <Input
        placeholder="vince@callpier.com"
        backgroundColor="white"
        value={shareEmail}
        onChange={(e) => setShareEmail(sanitize(e.target.value))}
        type='email'
        required
      />
      <div className="text">
        Expiration time:
      </div>
      <Input
        type='datetime-local'
        placeholder="Select Date and Time"
        backgroundColor="white"
        value={date}
        onChange={(e) => setDate(sanitize(e.target.value))}
        required
      />
      <div>
      </div>
      <Button
        colorScheme="green"
        width="full"
        type="submit"
        isDisabled={!shareEmail || !date}
      >
        Create Share Link Access
      </Button>
      {successMessage ? (
        <Text color="green" fontStyle="italic" maxWidth="100%">
          {successMessage}
        </Text>
      ) : null}
      {linkError || errorMessage ? (
        <Text color="red" fontStyle="italic" maxWidth="100%">
          {linkError || errorMessage}
        </Text>
      ) : null}
    </VStack>
  );
};
