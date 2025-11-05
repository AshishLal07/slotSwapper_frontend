import { useEffect, useState } from "react";
import { useSocket, type notify } from "../../contexts/socket-context";
import NotificationToast from "./NotifcationToast";

const NotificationContainer = () => {
  const { notifications } = useSocket();
  const [visibleNotifications, setVisibleNotifications] = useState<notify[]>([]);
    
  useEffect(() => {
    if (notifications) {
        if(notifications.length === 1){
           let latest:notify = notifications[0];
             if (!visibleNotifications.find((n:notify) => n.timestamp === latest.timestamp)) {
                 setVisibleNotifications(prev => [latest, ...prev].slice(0, 3));
      }
        }else{
            let latest:notify[] = notifications
              setVisibleNotifications((prev) => [...latest,...prev].slice(0, 3))
        }
    }
  }, [notifications]);

  const removeNotification = (timestamp:string) => {    
    setVisibleNotifications(prev => prev.filter(n => n.timestamp !== timestamp));
  };
  
  return (
    <div className="fixed top-20 right-6 z-50 space-y-2 w-96">
      {visibleNotifications.length > 0 && visibleNotifications.map((notification) => (
        <NotificationToast
          key={notification.timestamp}
          notification={notification}
          onClose={() => removeNotification(notification.timestamp)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;