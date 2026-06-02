function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by title or photographer"
      aria-label="Search wallpapers"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
    />
  );
}

export default SearchBar;
