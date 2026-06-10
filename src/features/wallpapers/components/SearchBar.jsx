function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by title or photographer"
      aria-label="Search wallpapers"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400 dark:focus:border-zinc-500"
    />
  );
}

export default SearchBar;
