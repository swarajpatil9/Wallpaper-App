function getPageRange(currentPage, totalPages, delta = 2) {
  const range = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);

  if (left > 2) range.push("...");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) range.push("...");

  if (totalPages > 1) range.push(totalPages);

  return range;
}

const btnBase =
  "rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50";
const btnActive =
  "rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageRange(currentPage, totalPages);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={btnBase}
      >
        Previous
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 py-2 text-sm text-zinc-400 select-none"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={page === currentPage ? btnActive : btnBase}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={btnBase}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
