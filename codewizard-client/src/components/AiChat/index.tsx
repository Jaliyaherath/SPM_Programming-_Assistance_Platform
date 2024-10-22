import AIChatContextProvider from '@/context/AIChatContext';
import ChatDrawer from './ChatDrawer';

const AiChatBot: React.FC = () => {
    return (
        <>
            <AIChatContextProvider>
                <ChatDrawer />
            </AIChatContextProvider>
        </>
    );
};

export default AiChatBot;
