import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import store from "./redux/store";
const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <App />
          </ThemeProvider>
        </GoogleOAuthProvider>
      </PersistGate>
      
      <Toaster />
    </Provider>
  </StrictMode>
)
