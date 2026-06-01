import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm10-9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm12.66-6.24a1 1 0 0 1 0 1.41l-.7.71a1 1 0 0 1-1.42-1.41l.71-.71a1 1 0 0 1 1.41 0ZM8.45 15.96a1 1 0 0 1 0 1.41l-.71.71a1 1 0 0 1-1.41-1.41l.7-.71a1 1 0 0 1 1.42 0Zm8.51 2.12a1 1 0 0 1-1.41 0l-.71-.7a1 1 0 1 1 1.41-1.42l.71.71a1 1 0 0 1 0 1.41ZM8.45 8.04a1 1 0 0 1-1.42 0l-.7-.71a1 1 0 1 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
      aria-hidden="true"
    >
      <path d="M20.74 14.05A8 8 0 0 1 9.95 3.26a1 1 0 0 0-1.31-1.2A10 10 0 1 0 21.94 15.36a1 1 0 0 0-1.2-1.31Z" />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative inline-flex h-11 w-[6.25rem] items-center rounded-full border border-zinc-200 bg-white/85 p-1 shadow-[0_14px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-zinc-950/75 dark:shadow-[0_14px_40px_rgba(0,0,0,0.28)] dark:hover:border-indigo-400/40 dark:focus-visible:ring-offset-zinc-950"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="pointer-events-none flex w-full items-center justify-between px-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
        <span className="text-amber-500 dark:text-amber-300">
          <SunIcon />
        </span>
        <span className="text-indigo-500 dark:text-indigo-300">
          <MoonIcon />
        </span>
      </span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
        className={[
          "absolute top-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg",
          isDark
            ? "left-[calc(100%-2.5rem)] from-indigo-500 to-indigo-700 shadow-indigo-950/35"
            : "left-1 from-amber-300 to-orange-400 text-zinc-950 shadow-orange-950/20",
        ].join(" ")}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.span>
    </button>
  );
}

export default ThemeToggle;
