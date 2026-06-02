import { useMemo, useState } from "react";

function usePagination(items = [], itemsPerPage = 8) {
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const [requestedPage, setRequestedPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(safeItems.length / itemsPerPage));
  const currentPage = Math.min(requestedPage, totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return safeItems.slice(startIndex, endIndex);
  }, [currentPage, safeItems, itemsPerPage]);

  function goToPage(page) {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setRequestedPage(nextPage);
  }

  function nextPage() {
    setRequestedPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  function previousPage() {
    setRequestedPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    previousPage,
  };
}

export default usePagination;
