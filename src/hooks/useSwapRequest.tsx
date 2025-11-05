import { useState } from "react";
import {type Event } from "./useEvent";
import swapAPi from "../api/api";
export interface swapRequest {
    _id:string,
    offerSlotId: Event,
    requestSlotId: Event
}

export const useSwapRequest = () => {

  const [incomingRequests, setIncomingRequests] = useState<swapRequest[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<swapRequest[]>([]);

  const fetchOutgoingRequest = async () => {
    try {
        const response = await swapAPi.get(`/api/event/slot/swap-requests/outgoing`);
        if(response.status === 200){
            setOutgoingRequests(response.data.requests);
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error?.message: "Something went wrong, try again later")
    }
  }
  const fetchIncomingRequest = async () => {
    try {
        const response = await swapAPi.get(`/api/event/slot/swap-requests/incoming`);
        if(response.status === 200){
            
            setIncomingRequests(response.data.requests);
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error?.message: "Something went wrong, try again later")
    }
  }

//   /slot/swap-response/:requestId

const swapResponse = async (requestId:string, accept:boolean) => {
    try {
        const response = await swapAPi.post(`/api/event/slot/swap-response/${requestId}`,{accept});
        if(response.status === 200){
            fetchIncomingRequest();
            fetchOutgoingRequest()
        }
        alert(accept ? 'Swap accepted! Your calendars have been updated.' : 'Swap rejected.');

    } catch (error) {
        throw new Error(error instanceof Error ? error?.message: "Something went wrong, try again later")
    }
  };


  return {incomingRequests, outgoingRequests, fetchIncomingRequest, fetchOutgoingRequest,swapResponse}
//   const loadRequests = async () => {
//     const incoming = await api.getIncomingRequests(user.id);
//     const outgoing = await api.getOutgoingRequests(user.id);
//     setIncomingRequests(incoming);
//     setOutgoingRequests(outgoing);
//   };
}