import { useCallback, useState } from 'react';
import swapAPi from '../api/api';

export interface  Event {
  _id?: string
  title: string
  startTime: string
  endTime: string
  date:string,
  isSwappable?: boolean
  status?: string
}


export function useEvent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const[ error, setError] = useState<string|null>(null)
    

  const fetchUserEvents = useCallback(async () => {
    setLoading(true);
    try {
        const response = await swapAPi.get('/api/event/slot');
        if(response.status === 200){
            setEvents(response.data.userEvent)
        }
    } catch (error) {
        throw new Error("Something went wrong, Please try again later")
    }
    finally {
      setLoading(false);
    }
  },[])

  const deleteEvent = async (eventId: string) => {
    console.log("delete");
    
    try {

        const response = await swapAPi.delete(`/api/event/slot/${eventId}`)
           if(response.status === 200){
             fetchUserEvents();
    }
    } catch (error) {
        throw new Error("Something went wrong, Please try again later")    
        
    }
  }

  const toggleEventSwappable = async (eventId:string,userId:string, currentStatus:string) => {
    try {
    const newStatus = currentStatus === 'BUSY' ? 'SWAPPABLE' : 'BUSY';
    const response = await swapAPi.put(`/api/event/slot/${eventId}/${userId}/?status=${newStatus}`);
    
    if(response.status === 200){
     fetchUserEvents()
    }
    
    } catch (error) {
        throw new Error("Something went wrong, Please try again later")    
    }
  };

  const createNewEvent = async (newEvent:Event) => {
    setError("")
    try {
         if (!newEvent.title && !newEvent.date && !newEvent.startTime && !newEvent.endTime) {
            setError("All fields are required");
         }
        const response = await swapAPi.post('/api/event/slot', newEvent)
        if(response.status !== 200){
            const data = response.data
            throw new Error(data.message || "Failed to create event")
        }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  


  return { error, events, loading, refetchEvents: fetchUserEvents , deleteEvent, toggleSwappable:toggleEventSwappable, createNewEvent , };
}
