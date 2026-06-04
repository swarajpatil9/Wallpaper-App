import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import RouteFallback from "./components/common/RouteFallback";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import CategoryDetailsPage from "./pages/Categories/CategoryDetailsPage";

const DashboardPage = lazy(() => import("./pages/Home/DashboardPage"));
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const ForgotPasswordPage = lazy(
  () => import("./pages/Login/ForgotPasswordPage"),
);
const ProfilePage = lazy(() => import("./pages/Login/ProfilePage"));
const SignInPage = lazy(() => import("./pages/Login/SignInPage"));
const SignUpPage = lazy(() => import("./pages/Login/SignUpPage"));
const VerifyEmailPage = lazy(() => import("./pages/Login/VerifyEmailPage"));
const WallpaperDetailsPage = lazy(
  () => import("./pages/WallpaperDetails/WallpaperDetailsPage"),
);

function App() {
  const { pathname } = useLocation();
  const isAuthRoute =
    /^\/(sign-in|sign-up|forgot-password|verify-email)(\/|$)/.test(pathname);
  const isPrivateRoute = /^\/(dashboard|profile)(\/|$)/.test(pathname);

  useEffect(() => {
    let robotsMeta = document.head.querySelector('meta[name="robots"]');

    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.setAttribute(
      "content",
      isAuthRoute || isPrivateRoute ? "noindex,nofollow" : "index,follow",
    );
  }, [isAuthRoute, isPrivateRoute]);

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
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover/:categorySlug" element={<HomePage />} />
            <Route path="/topics/:tagSlug" element={<HomePage />} />
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-email/*" element={<VerifyEmailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoryDetailsPage />} />
            <Route
              path="/wallpapers/:wallpaperId"
              element={<WallpaperDetailsPage />}
            />
            <Route
              path="/wallpapers/:wallpaperId-:wallpaperSlug"
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
        </Suspense>
      </main>
    </div>
  );
}

export default App;
