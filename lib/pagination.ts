import { useMemo } from "react";

export function usePagination(data = [], page = 1, limit = 10) {
  const pagination = useMemo(() => {
    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / safeLimit);

    const startIndex = (safePage - 1) * safeLimit;
    const endIndex = startIndex + safeLimit;

    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      page: safePage,
      limit: safeLimit,
      totalPages,
      totalItems,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    };
  }, [data, page, limit]);

  return pagination;
}