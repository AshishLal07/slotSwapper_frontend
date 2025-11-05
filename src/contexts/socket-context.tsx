
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./auth-context";
import io ,{Socket} from 'socket.io-client';

export interface notify {
      type: string,
      message: string,
      swapRequestId: string,
      timestamp: string,
    }

interface SocketContextType {
    notifications: notify[],
    socket:Socket | null,
    clearNotifications : () => void
 } 


const SocketContext = createContext<SocketContextType | undefined>(undefined);


export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<notify[]>([]);
  const [socket, setSocket] = useState<Socket |null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user ) {
      const newSocket = io(import.meta.env.VITE_SERVER_URL, {
        transports: ['websocket', 'polling']
      });

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        newSocket.emit('register', user.id);
      });

      newSocket.on('notification', (data:notify) => {
        console.log('Notification received:', data);
        setNotifications(prev => [data, ...prev]);
        
        if (Notification.permission === 'granted') {
          new Notification('SlotSwapper', {
            body: data.message,
            icon: '/icon.png'
          });
        }
      });

      newSocket.on('pendingNotifications', (data:notify[]) => {
        console.log('Notification received:', data);
        setNotifications(prev => [...data, ...prev]);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      setSocket(newSocket);

      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }

      return () => {
        newSocket.disconnect();
        newSocket.off("pendingNotifications");
        newSocket.off("notification");
        
      };
    }
  }, [user]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <SocketContext.Provider value={{ notifications, socket , clearNotifications}}>
      {children}
    </SocketContext.Provider>
  );
};


export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within SocketProvider")
  }
  return context
}


