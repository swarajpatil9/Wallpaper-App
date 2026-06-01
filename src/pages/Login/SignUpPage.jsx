import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/clerk-react";
import AuthLayout from "../../components/common/AuthLayout";

function AuthSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

function SignUpPage() {
  return (
    <AuthLayout
      eyebrow="Onboarding"
      title="Create your account"
      description="Start saving favorites, syncing devices, and unlocking premium collections."
    >
      <ClerkLoading>
        <AuthSkeleton />
      </ClerkLoading>

      <ClerkLoaded>
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard"
          fallbackRedirectUrl="/dashboard"
          oauthFlow="popup"
        />
      </ClerkLoaded>
    </AuthLayout>
  );
}

export default SignUpPage;
