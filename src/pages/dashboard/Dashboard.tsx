import React from "react";
import {Icons} from '../../icons/Icons'
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router";
import CalendarView from "../../components/CalenderView";
import MarketplaceView from "../../components/MarketPlaceView";
import { RequestNotification } from "../../components/RequestNotification";
import NotificationContainer from "../../components/NotificationToast/NotifcationContainer";

function Dashboard() {
  const {user,loading, logout} = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = React.useState('calendar');
  const {ArrowLeftRight,LogOut,Calendar,Users, Bell} = Icons

  

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login")
    }
  }, [user, loading, navigate])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }
  
  return (
    <>
    <div className="min-h-screen bg-gray-50">
     < NotificationContainer />
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <ArrowLeftRight className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">SlotSwapper</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hello, {user && user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <aside className="w-64 space-y-2">
            <button
              onClick={() => setActiveView('calendar')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === 'calendar'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">My Calendar</span>
            </button>
            <button
              onClick={() => setActiveView('marketplace')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === 'marketplace'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Marketplace</span>
            </button>
            <button
              onClick={() => setActiveView('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeView === 'notifications'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium">Requests</span>
            </button>
          </aside>

          <main className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {activeView === 'calendar' && <CalendarView />}
            {activeView === 'marketplace' && <MarketplaceView />}
            {activeView === 'notifications' && <RequestNotification />}
          </main>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
