import React from "react";
import { useAuth } from "../contexts/auth-context";
import { Icons } from "../icons/Icons";
import { useSwap  } from "../hooks/useSwap";
import { useEvent, type Event } from "../hooks/useEvent";

const MarketplaceView = () => {
  const { user } = useAuth();
  const {loadSwappableData, submitSwapRequest, availableSlots} = useSwap();
  const {refetchEvents, events} = useEvent();
  const {Users, Calendar, Clock} = Icons;

  const [showSwapModal, setShowSwapModal] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState<Event | null>(null);

  React.useEffect(() => {
    if(user && user.id)
     loadSwappableData();
  }, [user,user?.id]);

  const handleRequestSwap = (slot:Event) => {
    setSelectedSlot(slot);
    setShowSwapModal(true);
  };

const handleSubmit = async (offerSlotId:string = "") =>{    
    try {
        if(offerSlotId && selectedSlot?._id === undefined) return
        await submitSwapRequest(offerSlotId, selectedSlot?._id)
    } catch (error) {
        throw new Error(error instanceof Error? error.message : "something went wrong try again later1")
    }finally{
        setShowSwapModal(false);
        setSelectedSlot(null);
    }
}

  React.useEffect(() => {
    refetchEvents()
  },[])

  const mySwappableSlots: Event[] = React.useMemo(() => {return events.filter((e:Event) => e.status === "SWAPPABLE")},[events]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Marketplace</h2>

      <div className="grid gap-4">
        {availableSlots.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No swappable slots available at the moment</p>
          </div>
        ) : (
          availableSlots.map((slot) => (
            <div key={slot?._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{slot.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {slot.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRequestSwap(slot)}
                  disabled={mySwappableSlots.length === 0}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Request Swap
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {mySwappableSlots.length === 0 && availableSlots.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            You need at least one swappable slot to request swaps. Mark one of your events as swappable in your calendar.
          </p>
        </div>
      )}

      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Choose Your Slot to Offer</h3>
            <div className="space-y-3 mb-6">
              {mySwappableSlots.map((slot:Event) => (
                <button
                  key={slot._id}
                  onClick={() => {handleSubmit(slot._id)}}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900">{slot.title}</h4>
                  <p className="text-sm text-gray-600">{slot.date} • {slot.startTime} - {slot.endTime}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSwapModal(false)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceView;