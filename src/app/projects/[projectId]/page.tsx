export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const projectId = params.projectId;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">プロジェクト詳細ページ</h1>
      <p>プロジェクトID: <span className="font-mono text-blue-600">{projectId}</span></p>
      <p className="mt-4 text-gray-600">ここにプロジェクトの詳細・ナビゲーション・各種機能を実装していきます。</p>
    </div>
  );
} 