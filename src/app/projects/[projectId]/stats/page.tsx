'use client';
import { useParams } from 'next/navigation';

export default function StatsPage() {
  const params = useParams();
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>プロジェクト統計ページ</h1>
      <p style={{ color: '#666' }}>プロジェクトID: {params?.projectId}</p>
    </div>
  );
} 