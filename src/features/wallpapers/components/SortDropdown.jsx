function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Sort wallpapers"
      className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-500"
    >
      <option value="featured">Featured</option>
      <option value="resolution-high">Highest Resolution</option>
      <option value="resolution-low">Lowest Resolution</option>
      <option value="landscape">Landscape First</option>
      <option value="portrait">Portrait First</option>
    </select>
  );
}

export default SortDropdown;
