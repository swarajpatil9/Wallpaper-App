function getClerkAppearance(theme) {
  const isDark = theme === "dark";

  return {
    layout: {
      logoPlacement: "none",
      socialButtonsPlacement: "top",
      socialButtonsVariant: "blockButton",
    },
    unsafe_disableDevelopmentModeWarnings: true,
    variables: {
      colorPrimary: "#4338ca",
      colorText: isDark ? "#f4f4f5" : "#09090b",
      colorTextSecondary: isDark ? "#a1a1aa" : "#52525b",
      colorNeutral: isDark ? "#27272a" : "#e4e4e7",
      colorBackground: isDark
        ? "rgba(24, 24, 27, 0.82)"
        : "rgba(255, 255, 255, 0.9)",
      colorInputBackground: isDark
        ? "rgba(9, 9, 11, 0.76)"
        : "rgba(255, 255, 255, 0.92)",
      colorInputText: isDark ? "#fafafa" : "#09090b",
      borderRadius: "1rem",
      fontFamily: "Inter, sans-serif",
    },
    elements: {
      rootBox: "w-full",
      cardBox: "w-full shadow-none",
      card: isDark
        ? "w-full rounded-[1.75rem] border border-zinc-700/80 bg-transparent p-0 shadow-none"
        : "w-full rounded-[1.75rem] border border-zinc-200/90 bg-transparent p-0 shadow-none",
      badge: "hidden",
      header: "hidden",
      headerTitle: "hidden",
      headerSubtitle: "hidden",
      formHeaderTitle: "hidden",
      formHeaderSubtitle: "hidden",
      footer: "hidden",
      footerItem: "hidden",
      footerPages: "hidden",
      footerAction: "hidden",
      footerActionLink: "hidden",
      form: "gap-4",
      formFieldRow: "gap-4",
      formFieldLabel: isDark
        ? "mb-2 text-sm font-semibold text-zinc-200"
        : "mb-2 text-sm font-semibold text-zinc-700",
      formFieldHintText: isDark
        ? "text-sm text-zinc-400"
        : "text-sm text-zinc-500",
      formFieldInput: isDark
        ? "h-12 rounded-2xl border border-[#4B5563] bg-zinc-900 px-4 text-sm text-white shadow-sm transition-all duration-300 placeholder:text-zinc-500 hover:border-indigo-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20"
        : "h-12 rounded-2xl border border-[#D1D5DB] bg-white px-4 text-sm text-zinc-950 shadow-sm transition-all duration-300 placeholder:text-zinc-400 hover:border-indigo-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/12",
      formFieldInputShowPasswordButton: isDark
        ? "text-zinc-500 hover:text-zinc-200"
        : "text-zinc-400 hover:text-zinc-700",
      formFieldAction: isDark
        ? "text-sm font-semibold text-amber-300 hover:text-amber-200"
        : "text-sm font-semibold text-amber-600 hover:text-amber-700",
      formFieldAction__password: isDark
        ? "text-sm font-semibold text-amber-300 hover:text-amber-200"
        : "text-sm font-semibold text-amber-600 hover:text-amber-700",
      formButtonPrimary: isDark
        ? "h-12 rounded-2xl border border-indigo-400/70 bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-950/35 transition-all duration-300 hover:scale-[1.01] hover:border-indigo-300 hover:bg-indigo-500"
        : "h-12 rounded-2xl border border-indigo-500/60 bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-700/25 transition-all duration-300 hover:scale-[1.01] hover:border-indigo-600 hover:bg-indigo-700",
      socialButtonsBlockButton: isDark
        ? "h-12 rounded-2xl border border-[#4B5563] bg-slate-900 text-white shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-indigo-300 hover:bg-slate-800"
        : "h-12 rounded-2xl border border-[#D1D5DB] bg-white text-zinc-950 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-indigo-300 hover:bg-zinc-50",
      socialButtonsBlockButtonText: isDark
        ? "text-sm font-semibold text-white"
        : "text-sm font-semibold text-zinc-900",
      socialButtonsProviderIcon: "brightness-110 contrast-125",
      dividerLine: isDark ? "bg-[#4B5563]" : "bg-[#D1D5DB]",
      dividerText: isDark
        ? "bg-transparent px-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500"
        : "bg-transparent px-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400",
      otpCodeFieldInput: isDark
        ? "h-12 rounded-2xl border border-[#4B5563] bg-zinc-900 text-zinc-50 shadow-sm transition-all duration-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20"
        : "h-12 rounded-2xl border border-[#D1D5DB] bg-white text-zinc-950 shadow-sm transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/12",
      identityPreviewText: isDark ? "text-zinc-400" : "text-zinc-500",
      identityPreviewEditButton: isDark
        ? "text-sm font-semibold text-amber-300 hover:text-amber-200"
        : "text-sm font-semibold text-amber-600 hover:text-amber-700",
      formResendCodeLink: isDark
        ? "text-sm font-semibold text-amber-300 hover:text-amber-200"
        : "text-sm font-semibold text-amber-600 hover:text-amber-700",
      alternativeMethodsBlockButton: isDark
        ? "rounded-2xl border border-[#4B5563] bg-zinc-900 text-zinc-100 hover:border-indigo-400"
        : "rounded-2xl border border-[#D1D5DB] bg-white text-zinc-900 hover:border-indigo-400",
      alert: isDark
        ? "rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-200"
        : "rounded-2xl border border-amber-300/50 bg-amber-50 text-amber-700",
      formResendCodeLink__timer: isDark ? "text-zinc-500" : "text-zinc-400",
      formFieldWarningText: isDark ? "text-amber-300" : "text-amber-600",
      userProfileRootBox: "w-full",
      profileSection: isDark
        ? "rounded-2xl border border-zinc-800 bg-zinc-900"
        : "rounded-2xl border border-zinc-200 bg-white",
      profileSectionTitle: isDark ? "text-zinc-50" : "text-zinc-950",
      profileSectionPrimaryButton:
        "rounded-2xl bg-indigo-700 text-white hover:bg-indigo-800",
      profileSectionContent: isDark ? "text-zinc-400" : "text-zinc-500",
      navbar: isDark
        ? "rounded-[1.5rem] border border-zinc-800 bg-zinc-950 p-2"
        : "rounded-[1.5rem] border border-zinc-200 bg-white p-2",
      navbarButton: isDark
        ? "rounded-xl px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-50"
        : "rounded-xl px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950",
      navbarButton__active: "bg-indigo-700 text-white hover:bg-indigo-800",
      pageScrollBox: "pr-0 max-h-none overflow-visible",
      formFieldSuccessText: isDark ? "text-emerald-400" : "text-emerald-600",
      formFieldErrorText: isDark ? "text-rose-400" : "text-rose-600",
      userButtonPopoverCard: isDark
        ? "rounded-[1.75rem] border border-zinc-800 bg-zinc-900 shadow-2xl"
        : "rounded-[1.75rem] border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/80",
      userButtonPopoverFooter: "hidden",
      formContainer: "space-y-5",
      formField: "space-y-2",
      modalContent: isDark
        ? "bg-zinc-900 text-zinc-50"
        : "bg-white text-zinc-950",
    },
  };
}

export { getClerkAppearance };
