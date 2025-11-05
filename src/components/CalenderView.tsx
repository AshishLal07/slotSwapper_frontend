import React from "react";
import { useAuth } from "../contexts/auth-context";
import { Icons } from "../icons/Icons";
import { useEvent } from "../hooks/useEvent";

interface Event {
  _id?: string
  title: string
  startTime: string
  endTime: string
  date:string,
  isSwappable?: boolean
  status?: string
}

export default function CalendarView  ()  {
  const { user } = useAuth();
  const {error, events,createNewEvent ,refetchEvents : loadEvents, deleteEvent, toggleSwappable} = useEvent()
  const {Plus, Calendar, RefreshCw,Clock,Trash2} = Icons;

  const [showModal, setShowModal] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState<Event>({
    title: '',
    date: '',
    startTime: '',
    endTime: ''
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
        await createNewEvent(newEvent);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setShowModal(false);
      setNewEvent({ title: '', date: '', startTime: '', endTime: '' });
      loadEvents();
    }
  }

  React.useEffect(() => {
    if(user && user.id)
      loadEvents();
  }, [user, user?.id]);

  return (
    <div className="  space-y-6   max-h-[70vh] overflow-hidden   ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Calendar</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Event
        </button>
      </div>

      <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto">
        {events.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No events yet. Create your first event!</p>
          </div>
        ) : (
          events.map((event:Event) => (
            <div
              key={event._id}
              className={`h-fit relative bg-white border-l-4  rounded-lg p-4 shadow-sm ${
                event.status === 'SWAPPABLE' ? 'border-green-500' : 'border-red-300'
              }`}
            >
                <div className="absolute top-0 right-1" onClick={() => {if(event._id) deleteEvent(event._id)}}><Trash2 className="w-4 h-4 text-red-600" /></div>
              <div className="grid grid-cols-2 gap-1 text-center justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 text-left">{event.title}</h3>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'SWAPPABLE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-gray-800'
                    }`}
                  >
                    {event.status}
                  </span>
                  <button
                    onClick={() => {if(event._id && user?.id && event.status){
                        toggleSwappable(event._id, user?.id, event.status)
                    }}}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title={event.status === 'BUSY' ? 'Make Swappable' : 'Make Busy'}
                  >
                    <RefreshCw className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-sm text-gray-600 col-span-2">
                    <span className="flex  items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </span>
                </div>
                    
                <div>
                    <span className="flex max-md:flex-col items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.startTime} - {event.endTime}
                    </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New Event</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                 {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">{error}</div>}
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false)}}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    {loading ? "Creating...": "Create Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



// This is the most critical part of the backend.
// GET /api/swappable-slots
// This endpoint must return all slots from other users that are marked as SWAPPABLE.
// It should not include the logged-in user's own slots.
// POST /api/swap-request
// This endpoint should accept the ID of the user's slot (mySlotId) and the ID of the desired slot (theirSlotId).
// Server-side logic: You must verify that both slots exist and are currently SWAPPABLE.
// Create a new SwapRequest record (e.g., with a PENDING status), linking the two slots and users.
// Update the status of both original slots to SWAP_PENDING to prevent them from being offered in other swaps.
// POST /api/swap-response
// This endpoint allows a user to respond to an incoming swap request (e.g., /api/swap-response/:requestId).
// The request body should indicate acceptance (true/false).
// If Rejected: The SwapRequest status is set to REJECTED, and the two slots involved must be set back to SWAPPABLE.
// If Accepted: This is the key transaction. The SwapRequest is marked ACCEPTED. The owner (or userId) of the two slots must be exchanged. Both slots' status should be set back to BUSY.

// 4. Frontend: UI/UX

// Authentication: Create sign-up and log-in pages/forms.
// Calendar/Dashboard View:
// A page where a user can see their own events (a simple list view or a calendar grid is fine).
// They must be able to create new events.
// They must be able to update an existing event's status (e.g., click a "Make Swappable" button on a BUSY event).
// Marketplace View:
// A page that fetches and displays the list of available slots from GET /api/swappable-slots.
// Add a "Request Swap" button to each slot. Clicking this should (e.g., in a modal) show the user a list of their own SWAPPABLE slots to choose from as their offer.
// Notifications/Requests View:
// A page that shows two lists:
// Incoming Requests: Swaps other users have offered them. Each must have "Accept" and "Reject" buttons that call the POST /api/swap-response endpoint.
// Outgoing Requests: Swaps they have offered to others (showing "Pending...").
// State Management:
// The application must update its state dynamically. For example, after a user accepts a swap, their calendar view should reflect this change without requiring a manual page refresh.
// Authenticated routes should be protected.
