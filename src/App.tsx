import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth/(Auth)/AuthContext/AuthContext";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./errors/not-found/ErrorPage";
import ResetPasswordPage from "./pages/Login/resetPasswordPage";
import SignInPage from "./pages/Login/SignInPage";
import AppRouter from "./routes/AppRouter";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/ResetPassword" element={<ResetPasswordPage />} />
          <Route path="/" element={<Layout />}>
            {AppRouter.map((route) => (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.children?.map((child) => (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={child.element}
                  />
                ))}
              </Route>
            ))}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
