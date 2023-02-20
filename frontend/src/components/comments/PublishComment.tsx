import { Button, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { SyntheticEvent, useCallback } from "react";
import { usePublishComment } from "../../data/hooks/useSendComment";
import { usePublishCommentForm } from "../../data/hooks/useSendCommentForm";
import { sanitize } from '../../helper/sanitize';

export const PublishComment = () => {
  const { publishComment, commentError } =
    usePublishComment();
  const { userName, setUsername, text, setText } = usePublishCommentForm();

  const submit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      await publishComment({ userName, text });
      setText("");
    },
    [userName, text, publishComment, setText]
  );

  return (
    <VStack minHeight="200px" pt="2" as="form" onSubmit={submit}>
      <Input
        placeholder="Your name"
        backgroundColor="white"
        value={userName}
        onChange={(e) => setUsername(sanitize(e.target.value))}
        required
      />
      <Textarea
        placeholder="Your comment"
        backgroundColor="white"
        flexGrow={1}
        value={text}
        onChange={(e) => setText(sanitize(e.target.value))}
        required
      />
      <Button
        colorScheme="green"
        width="full"
        type="submit"
        isDisabled={!userName || !text}
      >
        Publish
      </Button>
      {commentError ? (
        <Text color="red" fontStyle="italic" maxWidth="100%">
          {commentError}
        </Text>
      ) : null}
    </VStack>
  );
};
