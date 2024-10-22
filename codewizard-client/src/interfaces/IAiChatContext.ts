import IMessage from "./IMessage";

export default interface IAiChatContext {
    isWaitingForReply: boolean;
    messageList: IMessage[];
    setMessageListHandler: (message: IMessage) => void;
    messageListLength: number;
    isError: boolean;
    errorMessage: string;
}
