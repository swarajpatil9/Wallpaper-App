import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import useTheme from "./components/common/useTheme";
import { getClerkAppearance } from "./utils/clerkAppearance";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local");
}

function Root() {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      afterSignOutUrl="/"
      appearance={getClerkAppearance(theme)}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default Root;
