import { useState } from 'react';
import { cn } from '@soup/utils';

export interface PaginationProps {
  current: number; // 현재 페이지
  total: number; // 아이템 총 개수
  showPage: number; // 보여줄 페이지 수
  showItem: number; // 보여줄 데이터 수
  onChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  current,
  total,
  showPage,
  showItem,
  onChange,
  className,
  ...rest
}: PaginationProps) => {
  const totalPage = Math.ceil(total / showItem);
  const start = Math.max(
    1,
    Math.min(current - Math.floor(showPage / 2), totalPage - showPage + 1), // totalPage에서 마지막 showPage는 start값 변경되지 않도록 해서 shoePage 수 유지
  );

  const pages = [];
  for (let i = start; i < start + showPage; i++) {
    if (i <= totalPage) pages.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPage) {
      onChange(page);
    }
  };

  return (
    <div
      className={cn(
        'flex h-[42px] w-[438px] items-center gap-[42px]',
        className,
      )}
      {...rest}
    >
      <div className="flex gap-[8px]">
        <button onClick={() => handlePageChange(1)} className="size-[24px]">
          <img src="/chevrons-left.svg" alt="chevrons-left" />
        </button>
        <button
          className="size-[24px]"
          onClick={() => handlePageChange(Math.max(current - 1, 1))}
        >
          <img src="/chevron-left.svg" alt="chevron-left" />
        </button>
      </div>
      <div className="flex gap-[8px]">
        {pages.map((page) => (
          <button
            className={cn(
              'text-light size-[42px] gap-[10px] font-normal leading-6 tracking-[-0.5%]',
              current === page &&
                'text-dark border-lock-dark rounded-lg border',
            )}
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="flex gap-[8px]">
        <button
          className="size-[24px]"
          onClick={() => handlePageChange(Math.min(totalPage, current + 1))}
        >
          <img src="/chevron-right.svg" alt="chevron-right" />
        </button>
        <button
          className="size-[24px]"
          onClick={() => handlePageChange(totalPage)}
        >
          <img src="/chevrons-right.svg" alt="chevrons-right" />
        </button>
      </div>
    </div>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
