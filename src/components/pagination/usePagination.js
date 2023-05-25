import React from 'react';
import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({totalPages, currentPage}) => {
  const paginationRange = useMemo(() => {

    if (totalPages < 3) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (currentPage < 3) {
      return [1, 2, 3, DOTS, lastPageIndex];
    }

    if (!showLeftDots && showRightDots) {
      let leftRange = range(1, rightSiblingIndex);

      return [...leftRange, DOTS, totalPages];
    }

    if (currentPage > lastPageIndex - 2) {
      return [firstPageIndex, DOTS, lastPageIndex - 2, lastPageIndex - 1, lastPageIndex];
    }

    if (showLeftDots && !showRightDots) {
      let rightRange = range(
          leftSiblingIndex,
          totalPages
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPages, currentPage]);

  return paginationRange;
};
