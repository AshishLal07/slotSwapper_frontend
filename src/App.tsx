import CustomRoutes from "./routes";
import { AuthProvider } from "./contexts/auth-context";
import { SocketProvider } from "./contexts/socket-context";

function App() {
    return <>
    <AuthProvider>
        <SocketProvider>
         <CustomRoutes />
        </SocketProvider>
    </AuthProvider>
    </>
}

export default App
