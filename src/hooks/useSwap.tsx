import {  useState } from 'react';
import swapAPi from '../api/api';
import type { Event } from './useEvent';


export function useSwap() {
  const [availableSlots, setAvailableSlots] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const[ error, setError] = useState<string|null>(null)
    
  
  const fetchAllSwappableData = async () => {
  setLoading(true);
     try {
        const response = await swapAPi.get('/api/event/slot/swappable');
        if(response.status === 200 && response.data.slots !== undefined){
            setAvailableSlots(response.data.slots);
        }
    } catch (error) {
        throw new Error("Something went wrong, Please try again later")
    }finally{
      setLoading(false)
    }
}

  const submitSwapRequest = async (offerSlotId:string, selectedSlotId:string = "") => {
  setLoading(true)
  try {
    const response = await swapAPi.post('/api/event/slot/swap-request',{mySlotId:offerSlotId, theirSlotId:selectedSlotId})
    if(response.status){
      alert("swap request created successfully!");
    }
  } catch (error) {
    setError(error instanceof Error ? error.message : "Something went wrong try again later!")
    throw new Error(error instanceof Error ? error.message : "Something went wrong try again later!");

  }finally{
    setLoading(false)
  }
  };

  return {error, availableSlots, loading, loadSwappableData:fetchAllSwappableData, submitSwapRequest};
}
