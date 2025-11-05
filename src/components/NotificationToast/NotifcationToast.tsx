import { useEffect } from "react";
import type { notify } from "../../contexts/socket-context";
import { Icons } from "../../icons/Icons";

interface notifcationProps {
    notification: notify,
    onClose: () => void
}
const {Bell, Check, X, AlertCircle} = Icons
const NotifcationToast = ({ notification, onClose } : notifcationProps) => {


  const getIcon = () => {
    switch (notification.type) {
      case 'SWAP_REQUEST':
        return <Bell className="w-5 h-5 text-blue-600" />;
      case 'SWAP_ACCEPTED':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'SWAP_REJECTED':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'SWAP_REQUEST':
        return 'bg-blue-50 border-blue-200';
      case 'SWAP_ACCEPTED':
        return 'bg-green-50 border-green-200';
      case 'SWAP_REJECTED':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);
    
  

 return (
    <div className={`flex items-start gap-2 p-2 rounded-lg border ${getBgColor()} shadow-lg`}>
      {getIcon()}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(notification.timestamp).toLocaleTimeString()}
        </p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotifcationToast;