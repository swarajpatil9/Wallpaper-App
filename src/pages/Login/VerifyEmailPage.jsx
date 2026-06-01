import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/clerk-react";
import AuthLayout from "../../components/common/AuthLayout";

function VerificationSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

function VerifyEmailPage() {
  return (
    <AuthLayout
      eyebrow="Verification"
      title="Verify your email"
      description="Finish onboarding with the secure code sent to your inbox."
    >
      <ClerkLoading>
        <VerificationSkeleton />
      </ClerkLoading>

      <ClerkLoaded>
        <SignUp
          routing="path"
          path="/verify-email"
          signInUrl="/sign-in"
          forceRedirectUrl="/dashboard"
          fallbackRedirectUrl="/dashboard"
          oauthFlow="popup"
        />
      </ClerkLoaded>
    </AuthLayout>
  );
}

export default VerifyEmailPage;
