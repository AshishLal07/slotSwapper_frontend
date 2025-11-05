import { useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import { useSwapRequest , type swapRequest} from "../hooks/useSwapRequest";
import { Icons } from "../icons/Icons";


export const RequestNotification = () => {
  const { user } = useAuth();
  const {incomingRequests, outgoingRequests, fetchIncomingRequest, fetchOutgoingRequest,swapResponse } = useSwapRequest();
  
  const {Bell,Check, ArrowLeftRight, X} = Icons;

  const loadRequests = async () => {
     fetchIncomingRequest()
     fetchOutgoingRequest()
  };

  useEffect(() => {
    if(user?.id)
      loadRequests();
  }, [user?.id]);
  
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Incoming Requests</h2>
        {incomingRequests.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Bell className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No incoming swap requests</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {incomingRequests.map((request:swapRequest) => (
              <div key={request._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">They want to swap:</p>
                  <div className="bg-blue-50 rounded-lg p-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{request.offerSlotId.title}</h4>
                    <p className="text-sm text-gray-600">
                      {request.offerSlotId.date} • {request.offerSlotId.startTime} - {request.offerSlotId.endTime}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">For your:</p>
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900">{request.requestSlotId.title}</h4>
                    <p className="text-sm text-gray-600">
                      {request.requestSlotId.date} • {request.requestSlotId.startTime} - {request.requestSlotId.endTime}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => swapResponse(request._id, true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => swapResponse(request._id, false)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Outgoing Requests</h2>
        {outgoingRequests.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <ArrowLeftRight className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No pending swap requests</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {outgoingRequests.map((request:swapRequest) => (
              <div key={request._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Pending...
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">You offered:</p>
                  <div className="bg-blue-50 rounded-lg p-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{request.offerSlotId.title}</h4>
                    <p className="text-sm text-gray-600">
                      {request.offerSlotId.date} • {request.offerSlotId.startTime} - {request.offerSlotId.endTime}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">For:</p>
                  <div className="bg-indigo-50 rounded-lg p-3">
                    <h4 className="font-semibold text-gray-900">{request.requestSlotId.title}</h4>
                    <p className="text-sm text-gray-600">
                      {request.requestSlotId.date} • {request.requestSlotId.startTime} - {request.requestSlotId.endTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
