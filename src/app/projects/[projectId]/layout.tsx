import MuiSidebar from '@/components/layout/MuiSidebar';
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function ProjectLayout({ children, params }: { children: React.ReactNode, params: { projectId: string } }) {
  const projectId = params.projectId;
  // 仮のプロジェクト情報
  const projectInfo = {
    name: projectId ? decodeURIComponent(projectId) : 'プロジェクト',
    stage: '検証中',
    progress: 75,
  };
  // パンくずリスト
  const breadcrumbs: BreadcrumbItem[] = [
    { icon: <HomeIcon fontSize="small" />, label: 'ホーム', href: '/' },
    { icon: <LightbulbIcon fontSize="small" />, label: 'アイデアスタジオ', href: '/idea-studio' },
    { icon: <DashboardIcon fontSize="small" />, label: projectInfo.name, href: `/projects/${encodeURIComponent(projectInfo.name)}` },
    { label: 'プロジェクトホーム', active: true },
  ];
  return (
    <div className="flex h-screen">
      <MuiSidebar projectNav={true} projectInfo={projectInfo} breadcrumbs={breadcrumbs}>
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="sticky top-0 z-20 bg-white border-b">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          {children}
        </main>
      </MuiSidebar>
    </div>
  );
} 