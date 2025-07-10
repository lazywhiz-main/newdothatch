'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { usePathname, useParams } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DashboardIcon from '@mui/icons-material/Dashboard';

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

const PROJECT_PAGE_LABELS: Record<string, string> = {
  'canvas': 'リーンキャンバス',
  'validation': '検証トラッカー',
  'stage-gate': 'ステージゲート',
  'stats': 'プロジェクト統計',
  'hypothesis': '仮説を追加',
  'interview': 'インタビュー予約',
  'prototype': 'プロトタイプ作成',
  'metrics': '指標設定',
  'share': 'チーム共有',
  'export': 'レポート出力',
  'settings': 'プロジェクト設定',
};

export function ProjectBreadcrumbs() {
  const pathname = usePathname();
  const params = useParams();
  const projectId = params?.projectId ? decodeURIComponent(params.projectId as string) : 'プロジェクト';
  const pathParts = pathname.split('/').filter(Boolean);
  // /projects/[projectId]/[subPage] の場合
  const isProjectRoot = pathParts.length === 2; // ['projects', 'projectId']
  const subPage = pathParts.length > 2 ? pathParts[2] : undefined; // ['projects', 'projectId', 'subPage']
  const breadcrumbs = [
    { icon: <HomeIcon fontSize="small" />, label: 'ホーム', href: '/' },
    { icon: <LightbulbIcon fontSize="small" />, label: 'アイデアスタジオ', href: '/idea-studio' },
    { icon: <DashboardIcon fontSize="small" />, label: projectId, href: `/projects/${encodeURIComponent(projectId)}` },
  ];
  if (subPage && PROJECT_PAGE_LABELS[subPage]) {
    breadcrumbs.push({ label: PROJECT_PAGE_LABELS[subPage], icon: <span />, href: `/projects/${encodeURIComponent(projectId)}/${subPage}` });
  } else {
    breadcrumbs.push({ label: 'プロジェクトホーム', icon: <span />, href: `/projects/${encodeURIComponent(projectId)}` });
  }
  return <Breadcrumbs items={breadcrumbs} />;
}

export default Breadcrumbs; 