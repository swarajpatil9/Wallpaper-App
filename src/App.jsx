import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import DashboardPage from "./pages/Home/DashboardPage";
import HomePage from "./pages/Home/HomePage";
import ForgotPasswordPage from "./pages/Login/ForgotPasswordPage";
import ProfilePage from "./pages/Login/ProfilePage";
import SignInPage from "./pages/Login/SignInPage";
import SignUpPage from "./pages/Login/SignUpPage";
import VerifyEmailPage from "./pages/Login/VerifyEmailPage";
import WallpaperDetailsPage from "./pages/WallpaperDetails/WallpaperDetailsPage";

function App() {
  const { pathname } = useLocation();
  const isAuthRoute =
    /^\/(sign-in|sign-up|forgot-password|verify-email)(\/|$)/.test(pathname);

  return (
    <div
      className={[
        "bg-transparent text-zinc-900 dark:text-zinc-100",
        isAuthRoute ? "min-h-screen" : "min-h-screen",
      ].join(" ")}
    >
      <Navbar />
      <main
        className={[
          "mx-auto flex w-full flex-1 flex-col",
          isAuthRoute
            ? "min-h-[calc(100vh-5.5rem)] max-w-none overflow-y-auto overflow-x-hidden px-0 pb-6 pt-0"
            : "max-w-7xl px-4 pb-14 pt-4 sm:px-6 lg:px-8",
        ].join(" ")}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email/*" element={<VerifyEmailPage />} />
          <Route
            path="/wallpapers/:wallpaperId"
            element={<WallpaperDetailsPage />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
