import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { DOTS, usePagination } from './usePagination';
import './style.css';

function Pagination({currentPage, totalPages, onChangePage}) {
  const paginationRange = usePagination({totalPages, currentPage});

  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      <div className={cn('nav')}>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li key={index} className={cn('item') + ' dots'}>&#8230;</li>;
          }

          return (
              <li
                  key={index}
                  className={pageNumber === currentPage ? cn('item') + ' active' : cn('item')}
                  onClick={pageNumber !== currentPage ? () => onChangePage(pageNumber) : undefined}
              >
                {pageNumber}
              </li>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Pagination);