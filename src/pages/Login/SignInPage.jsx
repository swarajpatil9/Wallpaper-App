import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/clerk-react";
import AuthLayout from "../../components/common/AuthLayout";

function AuthSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

function SignInPage() {
  return (
    <AuthLayout
      eyebrow="Access"
      title="Welcome back"
      description="Access your curated collection and continue where you left off."
      showForgotLink
    >
      <ClerkLoading>
        <AuthSkeleton />
      </ClerkLoading>

      <ClerkLoaded>
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/dashboard"
          fallbackRedirectUrl="/dashboard"
          oauthFlow="popup"
        />
      </ClerkLoaded>
    </AuthLayout>
  );
}

export default SignInPage;
