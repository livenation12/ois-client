import { Button } from '@/components/ui/button';
import { useWebSocketService } from '@/hooks/use-ws-service';
import { useEffect, useState } from 'react'

export default function HomeIndex() {
     const [messages, setMessages] = useState<Record<string, any>[]>([]);

     const { send, connect, disconnect, subscribe, unsubscribe } = useWebSocketService(
          '/ws',
          () => {
               console.log('Connected!')
               subscribe('/topic/notification', (message) => {
                    console.log("📩 Got message:", message);
                    setMessages(prev => [...prev, message]);
               });

          },
          (error) => console.log('WebSocket Error:', error)
     );

     const notificationUrl = '/topic/notification';

     useEffect(() => {
          connect();

          // subscribe(notificationUrl, (message) => {
          //      console.log(message);

          //      setMessages((prevMessages) => [...prevMessages, message.text]);
          // });

          return () => {
               unsubscribe(notificationUrl);
               disconnect();
          };
     }, []);

     return (
          <>
               <Button onClick={() => send("/app/greet", { name: "John" })}>Greet</Button>

               {
                    messages.map((message, index) => (
                         <div key={index}>{message.name}</div>
                    ))
               }
          </>
     )
}
