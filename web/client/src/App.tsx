import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import {
  LocalizationProvider,
  webLocalizationProviderProps,
} from "./localization";
import { Home } from "./components/Home";
import { SignIn } from "./components/auth/SignIn";
import { SignInEmailPass } from "./components/auth/SignInEmailPass";
import { SignUp } from "./components/auth/SignUp";
import { AuthCallback } from "./components/auth/AuthCallback";

function App() {
  return (
    <LocalizationProvider {...webLocalizationProviderProps}>
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-in/email" element={<SignInEmailPass />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    </LocalizationProvider>
  );
}

export default App;
