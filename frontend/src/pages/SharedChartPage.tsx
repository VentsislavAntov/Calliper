import { useState, useCallback, SyntheticEvent } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import { Chart } from "../components/Chart";
import { ChartPageLayout } from "../components/ChartPageLayout";
import { useSharedChartData } from "../data/hooks/useSharedChartData";
import { useLinkDetails } from "../data/hooks/useLinkDetails";
import { useExpireDateStorage } from "../data/hooks/useExpireDateStorage";
import { sanitize } from "../helper/sanitize";


export const SharedChartPage = () => {
  const linkDetails = useLinkDetails();
  const data = useSharedChartData();
  const [email, setEmail] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const { hasEmailExpired, setHasEmailExpired } = useExpireDateStorage();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      // Initial check for expired if already attempted
      if (hasEmailExpired === 'expired') {
        return;
      }
      if (email === linkDetails!.email) {
        // checking if expiring date is before now
        const dateString = linkDetails!.expiringDateTime;
        const date = new Date(dateString);
        const today = new Date();

        if (date < today) {
          setHasEmailExpired('expired');
        } else {
          // If both email and expiry date pass all conditions, show the chart
          setShowChart(true);
        }
      } else {
        setEmailErrorMessage('Incorrect email. Please try again.')
      }
    },
    [email, hasEmailExpired, linkDetails, setHasEmailExpired]
  );

  const handleClose = () => {
    setShowChart(false);
  };

  if (data == null) return null;

  return (
    <div>
      <Modal isOpen={!showChart} onClose={handleClose}>
        <ModalOverlay />
        {!hasEmailExpired ? 
        <ModalContent>
          <ModalHeader>Enter your email address to view the chart:</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(sanitize(e.target.value))} />
              </FormControl>
              <Button mt={4} colorScheme="blue" type="submit">
                Submit
              </Button>
            </form>
            {emailErrorMessage && 
            <Text color="red" fontStyle="italic" maxWidth="100%">
              {emailErrorMessage}
            </Text>}
          </ModalBody>
        </ModalContent> 
        : 
        <ModalContent>
          <ModalBody>
            <Text textAlign="center" color="red" fontStyle="italic" maxWidth="100%">
              The email has already expired.
            </Text>
          </ModalBody>
        </ModalContent> }
      </Modal>
      {showChart && <ChartPageLayout main={<Chart data={data} />} />}
    </div>
  );
};
