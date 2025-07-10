import MuiSidebar from '@/components/layout/MuiSidebar';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { usePathname, useParams } from 'next/navigation';
import { ProjectBreadcrumbs } from '@/components/Breadcrumbs';

const PAGE_LABELS: Record<string, string> = {
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

export default function ProjectLayout({ children, params }: { children: React.ReactNode, params: { projectId: string } }) {
  const projectId = params.projectId;
  // 仮のプロジェクト情報
  const projectInfo = {
    name: projectId ? decodeURIComponent(projectId) : 'プロジェクト',
    stage: '検証中',
    progress: 75,
  };
  // パンくずリスト（ProjectBreadcrumbsのロジックを流用）
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const pathParts = pathname.split('/').filter(Boolean);
  const subPage = pathParts.length > 2 ? pathParts[2] : undefined;
  const PAGE_LABELS: Record<string, string> = {
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
  let breadcrumbs: BreadcrumbItem[] = [
    { icon: <HomeIcon fontSize="small" />, label: 'ホーム', href: '/' },
    { icon: <LightbulbIcon fontSize="small" />, label: 'アイデアスタジオ', href: '/idea-studio' },
    { icon: <DashboardIcon fontSize="small" />, label: projectInfo.name, href: `/projects/${encodeURIComponent(projectInfo.name)}` },
  ];
  if (subPage && PAGE_LABELS[subPage]) {
    breadcrumbs.push({ label: PAGE_LABELS[subPage], active: true });
  } else {
    breadcrumbs.push({ label: 'プロジェクトホーム', active: true });
  }
  return (
    <div className="flex h-screen">
      <MuiSidebar projectNav={true} projectInfo={projectInfo} breadcrumbs={breadcrumbs}>
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="sticky top-0 z-20 bg-white border-b">
            <ProjectBreadcrumbs />
          </div>
          {children}
        </main>
      </MuiSidebar>
    </div>
  );
} 