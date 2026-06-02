function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-xl border border-zinc-300 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-500"
    >
      <option value="curated">Curated</option>
      <option value="photographer-asc">Photographer A-Z</option>
      <option value="photographer-desc">Photographer Z-A</option>
    </select>
  );
}

export default SortDropdown;