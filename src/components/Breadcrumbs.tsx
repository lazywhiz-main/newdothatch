import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export type BreadcrumbItem = {
  icon?: React.ReactNode; // アイコン（MUIアイコンやemoji）
  label: string;          // 表示テキスト
  href?: string;          // 遷移先（なければクリック不可）
  onClick?: () => void;   // クリック時のコールバック
  active?: boolean;       // 最後の階層かどうか
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav aria-label="breadcrumb" className={clsx('flex items-center space-x-1', className)}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="flex items-center">
            {idx > 0 && (
              <ChevronRightIcon className="mx-1 text-gray-300" fontSize="small" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                onClick={item.onClick}
                className={clsx(
                  'flex items-center px-2 py-1 rounded hover:bg-gray-100 transition',
                  'text-sm font-medium text-gray-500',
                  { 'font-semibold text-gray-900 bg-gray-100': item.active }
                )}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span
                className={clsx(
                  'flex items-center px-2 py-1 rounded',
                  'text-sm font-medium',
                  isLast ? 'font-bold text-gray-900 bg-gray-100' : 'text-gray-500',
                )}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs; 