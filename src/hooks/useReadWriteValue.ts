import {
  Conversation,
  EthAddress,
  useConversations,
  useReadValue,
  useWriteValue,
  useXmtpClient,
} from "@relaycc/xmtp-hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const REQUEST_CONVERSATION_ID = "relay.cc/requests/v1";

export enum RequestEnum {
  accepted = "accepted",
  ignored = "ignored",
  requested = "requested",
}

interface UseReadWriteValueProps {
  clientAddress: EthAddress;
}

export const useReadWriteValue = ({
  clientAddress,
}: UseReadWriteValueProps) => {
  const [requestsObject, setRequestsObject] = useState<Record<
    string,
    RequestEnum
  > | null>(null);

  const { data: conversations, isLoading: requestsLoading } = useConversations({
    clientAddress,
  });

  const { data: xmtpClient } = useXmtpClient({ clientAddress });

  // const a = new XmtpClient();
  const queue = useRef<Array<{ [key: string]: RequestEnum }>>([]);

  const running = useRef<boolean>(false);

  const processQueue = async () => {
    running.current = true;

    const [head, ...tail] = queue.current;
    queue.current = tail;

    const v = await xmtpClient?.readValue(REQUEST_CONVERSATION_ID);
    const newValue = JSON.stringify({
      ...JSON.parse(v as string),
      ...head,
    });
    write({ content: newValue });
    let interval: NodeJS.Timer;
    let counter = 0;
    await new Promise<void>((res, rej) => {
      interval = setInterval(async () => {
        counter += 1;
        if (counter === 100) {
          clearInterval(interval);
          queue.current = [];
          throw new Error("Event queue error, stuck interval.");
        }
        const value = await xmtpClient?.readValue(REQUEST_CONVERSATION_ID);
        if (
          JSON.parse(value as string)[Object.keys(head)[0]] ===
          Object.values(head)[0]
        ) {
          res();
        }
      }, 100);
    });
    // @ts-ignore
    interval && clearInterval(interval);

    if (queue.current?.length) {
      processQueue();
    } else {
      running.current = false;
    }
  };

  const addToQueue = (item: Array<{ [key: string]: RequestEnum }>) => {
    queue.current = [...item, ...queue.current];
    if (!running.current) {
      processQueue();
    }
  };

  const {
    data: value,
    isError: valueIsError,
    isLoading: valueIsLoading,
  } = useReadValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  const { mutate: accept, isLoading: acceptIsLoading } = useWriteValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  const { mutate: ignore, isLoading: ignoreIsLoading } = useWriteValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  const { mutate: unignore, isLoading: unignoreIsLoading } = useWriteValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });
  const { mutate: write } = useWriteValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  useEffect(() => {
    if (valueIsLoading || valueIsError) {
      return;
    }
    if (value) {
      setRequestsObject(JSON.parse(value as string));
      return;
    }
    write({ content: JSON.stringify({}) });
  }, [value, valueIsError, valueIsLoading, write]);

  const acceptedConversations = useMemo(
    function (): Conversation[] {
      if (valueIsLoading || valueIsError || !requestsObject || !conversations) {
        return [];
      }
      const sortArray = conversations?.map(
        (item) => item.peerAddress + item.context?.conversationId
      );
      const accepted = Object.entries(requestsObject)
        .map(([key, value]) => {
          if (value !== RequestEnum.accepted) {
            return;
          } else {
            return getConversationFromKey(key);
          }
        })
        .filter(Boolean)
        .sort(
          (a, b) =>
            sortArray.indexOf(
              (a?.peerAddress as EthAddress) + a?.context?.conversationId
            ) -
            sortArray.indexOf(
              (b?.peerAddress as EthAddress) + b?.context?.conversationId
            )
        );
      return accepted as Conversation[];
    },
    [requestsObject, valueIsLoading, valueIsError, conversations]
  );

  const ignoredConversations = useMemo((): Conversation[] => {
    if (valueIsLoading || valueIsError || !requestsObject) {
      return [];
    }
    const ignored: Conversation[] = [];
    Object.entries(requestsObject).forEach(([key, value]) => {
      if (value !== RequestEnum.ignored) {
        return;
      } else {
        ignored.push(getConversationFromKey(key));
      }
    });
    return ignored;
  }, [requestsObject, valueIsLoading, valueIsError]);

  const requestedConversations = useMemo((): Conversation[] => {
    if (valueIsLoading || valueIsError || !conversations || !requestsObject) {
      return [];
    }

    return conversations.filter((convo) => {
      const requestItem = requestsObject[getKeyFromConversation(convo)];
      return (
        (requestItem === undefined || requestItem === RequestEnum.requested) &&
        convo.context?.conversationId !== REQUEST_CONVERSATION_ID
      );
    });
  }, [conversations, requestsObject, valueIsLoading, valueIsError]);

  const acceptConversations = useCallback(
    ({ conversations }: { conversations: Conversation[] }) => {
      if (!requestsObject || !conversations) {
        return;
      }

      addToQueue(
        conversations.map((convo) => ({
          [getKeyFromConversation(convo)]: RequestEnum.accepted,
        }))
      );
    },
    [requestsObject, accept]
  );

  const ignoreConversations = useCallback(
    ({ conversations }: { conversations: Conversation[] }) => {
      if (!requestsObject || !conversations) {
        return;
      }

      addToQueue(
        conversations.map((convo) => ({
          [getKeyFromConversation(convo)]: RequestEnum.ignored,
        }))
      );
    },
    [requestsObject, ignore]
  );

  const unIgnoreConversations = useCallback(
    ({ conversation }: { conversation: Conversation }) => {
      if (!requestsObject || !conversation) {
        return;
      }

      addToQueue([
        {
          [getKeyFromConversation(conversation)]: RequestEnum.requested,
        },
      ]);
    },
    [requestsObject, unignore]
  );

  const isAccepted = useCallback(
    ({ conversation }: { conversation: Conversation }) => {
      if (!requestsObject || !conversation) {
        return null;
      }

      const value =
        requestsObject[
          `${conversation.peerAddress}${
            conversation?.context?.conversationId || ""
          }`
        ];

      return value === RequestEnum.accepted;
    },
    [requestsObject]
  );

  return {
    requestsLoading,
    acceptedLoading: valueIsLoading,
    requestsObject,
    acceptConversations,
    acceptIsLoading,
    ignoreIsLoading,
    unignoreIsLoading,
    ignoreConversations,
    unIgnoreConversations,
    acceptedConversations,
    ignoredConversations,
    requestedConversations,
    isAccepted,
  };
};

const getKeyFromConversation = (conversation: Conversation) => {
  return `${conversation.peerAddress}${
    conversation?.context?.conversationId || ""
  }`;
};

const getConversationFromKey = (key: string) => {
  const peerAddress = key.slice(0, 42) as EthAddress;
  const conversationId = key.slice(42);
  return {
    peerAddress,
    context:
      conversationId.length === 0
        ? undefined
        : { conversationId, metadata: {} },
  };
};
