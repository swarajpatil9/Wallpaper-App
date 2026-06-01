import { ClerkLoaded, ClerkLoading, useSignIn } from "@clerk/clerk-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/common/AuthLayout";

function Field({ label, type = "text", value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-[#D1D5DB] bg-white px-4 text-sm text-zinc-950 shadow-sm transition-all duration-300 placeholder:text-zinc-500 hover:border-indigo-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:border-[#4B5563] dark:bg-zinc-900 dark:text-zinc-50 dark:hover:border-indigo-400 dark:focus:border-indigo-400"
      />
    </label>
  );
}

function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
      {message}
    </div>
  );
}

function ResetSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

function extractErrorMessage(error) {
  if (!error) {
    return "Something went wrong. Please try again.";
  }

  return (
    error.longMessage ||
    error.message ||
    "Something went wrong. Please try again."
  );
}

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const { isLoaded, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSentCode, setHasSentCode] = useState(false);

  const currentStep = useMemo(() => {
    if (!hasSentCode) {
      return "request";
    }

    if (signIn?.status === "needs_new_password") {
      return "password";
    }

    return "verify";
  }, [hasSentCode, signIn?.status]);

  async function sendCode(event) {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { error: createError } = await signIn.create({ identifier: email });

      if (createError) {
        setErrorMessage(extractErrorMessage(createError));
        return;
      }

      const { error: sendCodeError } =
        await signIn.resetPasswordEmailCode.sendCode();

      if (sendCodeError) {
        setErrorMessage(extractErrorMessage(sendCodeError));
        return;
      }

      setHasSentCode(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function verifyCode(event) {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { error } = await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });

      if (error) {
        setErrorMessage(extractErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function submitPassword(event) {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const { error } = await signIn.resetPasswordEmailCode.submitPassword({
        password,
        signOutOfOtherSessions: true,
      });

      if (error) {
        setErrorMessage(extractErrorMessage(error));
        return;
      }

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize({
          navigate: async ({ decorateUrl, session }) => {
            if (session?.currentTask) {
              navigate("/profile");
              return;
            }

            const nextUrl = decorateUrl("/dashboard");

            if (nextUrl.startsWith("http")) {
              window.location.href = nextUrl;
              return;
            }

            navigate(nextUrl);
          },
        });

        if (finalizeError) {
          setErrorMessage(extractErrorMessage(finalizeError));
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isLoaded) {
    return <ResetSkeleton />;
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-100 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        {currentStep === "request"
          ? "Enter the email address attached to your account and we will send a reset code."
          : currentStep === "verify"
            ? "Check your inbox, then enter the reset code to continue."
            : "Create a fresh password to complete recovery and sign back in."}
      </div>

      <ErrorMessage message={errorMessage} />

      {currentStep === "request" ? (
        <form onSubmit={sendCode} className="space-y-5">
          <Field
            label="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-2xl border border-indigo-500/60 bg-indigo-600 text-sm font-semibold text-white shadow-2xl shadow-indigo-950/20 transition-all duration-300 hover:scale-[1.01] hover:border-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/30 dark:border-indigo-400/70 dark:hover:border-indigo-300 dark:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending code..." : "Send reset code"}
          </button>
        </form>
      ) : null}

      {currentStep === "verify" ? (
        <form onSubmit={verifyCode} className="space-y-5">
          <Field
            label="Verification code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Enter the code from your inbox"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-2xl border border-indigo-500/60 bg-indigo-600 text-sm font-semibold text-white shadow-2xl shadow-indigo-950/20 transition-all duration-300 hover:scale-[1.01] hover:border-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/30 dark:border-indigo-400/70 dark:hover:border-indigo-300 dark:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Verifying..." : "Verify code"}
          </button>
        </form>
      ) : null}

      {currentStep === "password" ? (
        <form onSubmit={submitPassword} className="space-y-5">
          <Field
            label="New password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a strong password"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-2xl border border-indigo-500/60 bg-indigo-600 text-sm font-semibold text-white shadow-2xl shadow-indigo-950/20 transition-all duration-300 hover:scale-[1.01] hover:border-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/30 dark:border-indigo-400/70 dark:hover:border-indigo-300 dark:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Updating password..." : "Set new password"}
          </button>
        </form>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-zinc-400">
        <Link
          to="/sign-in"
          className="font-semibold text-zinc-700 dark:text-zinc-100"
        >
          Return to sign in
        </Link>
        <span className="h-1 w-1 rounded-full bg-zinc-700" />
        <Link
          to="/sign-up"
          className="font-semibold text-amber-300 hover:text-amber-200"
        >
          Create a new account
        </Link>
      </div>
    </div>
  );
}

function ForgotPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Recovery"
      title="Reset your password"
      description="Recover access quickly with a secure step-by-step reset flow."
    >
      <ClerkLoading>
        <ResetSkeleton />
      </ClerkLoading>
      <ClerkLoaded>
        <ForgotPasswordForm />
      </ClerkLoaded>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
