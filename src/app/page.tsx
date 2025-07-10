"use client";

import { Box, Typography, Card, Grid } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BusinessIcon from "@mui/icons-material/Business";
import PublicIcon from "@mui/icons-material/Public";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import MicIcon from "@mui/icons-material/Mic";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useProjects } from "@/hooks/useProjects";
import { useRouter } from "next/navigation";
import Breadcrumbs, { BreadcrumbItem } from '@/components/Breadcrumbs';
import { useState } from 'react';
import Button from '@mui/material/Button';

type RoleType = 'owner' | 'approver';

interface OwnerData {
  title: string;
  icon: string;
  color: string;
  projects: Array<{ name: string; stage: string; date: string; status: string }>;
  tasks: string[];
  feedback: Array<{ project: string; comment: string }>;
}

interface ApproverData {
  title: string;
  icon: string;
  color: string;
  stepProjects: Array<{
    step: string;
    projects: Array<{
      name: string;
      status: string;
      date: string;
      criteria: Array<{ item: string; status: string }>;
      pending?: boolean;
    }>;
  }>;
}

type RoleData = OwnerData | ApproverData;

export default function Dashboard() {
  const { projects } = useProjects();
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<RoleType>('owner');

  // ダミーデータ（本来はuseProjectsやAPIから取得）
  const stats = [
    { icon: "📊", color: "linear-gradient(135deg, #10b981, #059669)", label: "アクティブプロジェクト", value: 8, trend: "+2 今月", trendType: "up" },
    { icon: "⏱️", color: "linear-gradient(135deg, #f59e0b, #d97706)", label: "平均検証サイクル(日)", value: 12, trend: "-3日 短縮", trendType: "down" },
    { icon: "⭐", color: "linear-gradient(135deg, #6366f1, #8b5cf6)", label: "今月のゲート判定", value: 3, trend: "予定通り", trendType: "up" },
    { icon: "🎯", color: "linear-gradient(135deg, #ef4444, #dc2626)", label: "検証成功率", value: "75%", trend: "+5% 向上", trendType: "up" },
  ];

  const activeProjects = projects.slice(0, 5); // サンプル: 5件だけ表示

  // ロール別データ
  const roleData: Record<RoleType, RoleData> = {
    owner: {
      title: "あなたはプロジェクトオーナーです",
      icon: "🎯",
      color: "#2590FD",
      projects: [
        { name: "スマート在庫管理", stage: "ゲート3", date: "7/15", status: "preparing" },
        { name: "AI品質検査", stage: "ゲート4", date: "7/22", status: "ready" },
        { name: "予知保全システム", stage: "ゲート3", date: "7/28", status: "preparing" },
      ],
      tasks: [
        "スマート在庫管理: 検証データ不足",
        "AI品質検査: 技術仕様書未提出",
        "予知保全システム: コスト分析完了",
      ],
      feedback: [
        { project: "スマート在庫管理", comment: "市場規模の根拠をより詳細に示してください" },
        { project: "AI品質検査", comment: "競合分析を追加" },
      ]
    },
    approver: {
      title: "あなたは承認者です",
      icon: "🔍",
      color: "#10b981",
      stepProjects: [
        {
          step: "アイデア段階",
          projects: [
            {
              name: "スマート在庫管理",
              status: "preparing",
              date: "7/15",
              criteria: [
                { item: "市場検証結果", status: "complete" },
                { item: "技術検証結果", status: "complete" },
                { item: "財務検証結果", status: "warning" },
                { item: "リスク評価", status: "complete" },
              ],
              pending: true // ←承認待ち
            },
            {
              name: "AI品質検査",
              status: "ready",
              date: "7/22",
              criteria: [
                { item: "市場検証結果", status: "complete" },
                { item: "技術検証結果", status: "complete" },
                { item: "財務検証結果", status: "warning" },
                { item: "リスク評価", status: "complete" },
              ]
            }
          ]
        },
        {
          step: "コンセプト",
          projects: [
            { name: "予知保全システム", status: "preparing", date: "7/28", criteria: [
              { item: "市場検証結果", status: "complete" },
              { item: "技術検証結果", status: "complete" },
              { item: "財務検証結果", status: "warning" },
              { item: "リスク評価", status: "complete" },
            ] }
          ]
        },
        {
          step: "検証中",
          projects: [
            { name: "スマート在庫管理", status: "preparing", date: "7/15", criteria: [
              { item: "市場検証結果", status: "complete" },
              { item: "技術検証結果", status: "complete" },
              { item: "財務検証結果", status: "warning" },
              { item: "リスク評価", status: "complete" },
            ] },
            { name: "AI品質検査", status: "ready", date: "7/22", criteria: [
              { item: "市場検証結果", status: "complete" },
              { item: "技術検証結果", status: "complete" },
              { item: "財務検証結果", status: "warning" },
              { item: "リスク評価", status: "complete" },
            ] },
            { name: "予知保全システム", status: "preparing", date: "7/28", criteria: [
              { item: "市場検証結果", status: "complete" },
              { item: "技術検証結果", status: "complete" },
              { item: "財務検証結果", status: "warning" },
              { item: "リスク評価", status: "complete" },
            ] }
          ]
        },
        {
          step: "開発中",
          projects: [
            { name: "予知保全システム", status: "preparing", date: "7/28", criteria: [
              { item: "市場検証結果", status: "complete" },
              { item: "技術検証結果", status: "complete" },
              { item: "財務検証結果", status: "warning" },
              { item: "リスク評価", status: "complete" },
            ] }
          ]
        }
      ]
    }
  };

  const getRoleContent = () => {
    const data = roleData[currentRole];
    
    switch (currentRole) {
      case 'owner': {
        const ownerData = data as OwnerData;
        return (
          <>
            {/* プロジェクトオーナー用コンテンツ */}
            <Box sx={{ bgcolor: '#f8faff', borderRadius: 3, p: 3, border: '1px solid #e1e5e9', mb: 3 }}>
              {/* アクティブプロジェクトカードの上部 */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography fontSize={14} fontWeight={600} color="#1f2937">🎯 進行中のプロジェクト ({ownerData.projects.length}件)</Typography>
                <Button size="small" variant="outlined" onClick={() => router.push('/idea-studio')}>詳細を見る</Button>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {ownerData.projects.map((proj, idx) => (
                  <Box key={idx} sx={{ 
                    border: '1px solid #e1e5e9', 
                    borderRadius: 3, 
                    p: 2.5, 
                    bgcolor: '#ffffff',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: ownerData.color,
                      boxShadow: `0 4px 12px ${ownerData.color}20`,
                    }
                  }}>
                    <Typography fontSize={12} fontWeight={600} color="#1f2937" sx={{ mb: 0.5 }}>{proj.name}</Typography>
                    <Typography fontSize={11} color="#6b7280" mb={1}>{proj.stage}</Typography>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      px: 1.5, 
                      py: 0.5, 
                      borderRadius: 2, 
                      bgcolor: proj.status === 'ready' ? '#dbeafe' : '#fef3c7', 
                      color: proj.status === 'ready' ? '#2590FD' : '#d97706',
                      fontSize: 11,
                      fontWeight: 600,
                      border: `1px solid ${proj.status === 'ready' ? '#bfdbfe' : '#fed7aa'}`
                    }}>
                      審査日：{proj.date}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ bgcolor: '#f8faff', borderRadius: 3, p: 3, border: '1px solid #e1e5e9', mb: 3 }}>
              <Typography fontSize={14} fontWeight={600} color="#1f2937" mb={2}>⚠️ 準備が必要な項目</Typography>
              <Box sx={{ space: 1 }}>
                {ownerData.tasks.map((task, idx) => (
                  <Typography key={idx} fontSize={13} color="#6b7280" sx={{ mb: 1, pl: 1, borderLeft: '3px solid #f59e0b' }}>
                    • {task}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box sx={{ bgcolor: '#f8faff', borderRadius: 3, p: 3, border: '1px solid #e1e5e9' }}>
              <Typography fontSize={14} fontWeight={600} color="#1f2937" mb={2}>💬 最近のフィードバック</Typography>
              <Box sx={{ space: 1 }}>
                {ownerData.feedback.map((item, idx) => (
                  <Box key={idx} sx={{ mb: 2, p: 2, bgcolor: '#ffffff', borderRadius: 2, border: '1px solid #e1e5e9' }}>
                    <Typography fontSize={13} fontWeight={600} color="#1f2937" mb={0.5}>{item.project}</Typography>
                    <Typography fontSize={12} color="#6b7280">{item.comment}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        );
      }

      case 'approver': {
        const approverData = data as ApproverData;
        return (
          <>
            {/* 承認者用コンテンツ */}
            <Box sx={{ bgcolor: '#f8faff', borderRadius: 3, p: 3, border: '1px solid #e1e5e9', mt: 3 }}>
              <Typography fontSize={14} fontWeight={600} color="#1f2937" mb={2}>📊 ステップ別プロジェクトボード</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
                {approverData.stepProjects.map((step, stepIdx) => (
                  <Box key={stepIdx} sx={{ border: '1px solid #e1e5e9', borderRadius: 3, p: 2.5, bgcolor: '#ffffff', transition: 'all 0.2s ease', '&:hover': { borderColor: approverData.color, boxShadow: `0 4px 12px ${approverData.color}20`, } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: approverData.color }} />
                      <Typography fontSize={13} fontWeight={600} color="#1f2937">{step.step}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {step.projects.map((proj, projIdx) => (
                        <Box key={projIdx} sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: '#fff', // 白ベース
                          border: `1px solid ${proj.status === 'ready' ? '#bfdbfe' : '#e5e7eb'}`,
                          transition: 'all 0.2s ease',
                          boxShadow: 'none',
                          minHeight: 90,
                          position: 'relative',
                          '&:hover': {
                            bgcolor: proj.status === 'ready' ? '#f0f7ff' : '#fdf6e3',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }
                        }}>
                          {/* 承認待ちラベル */}
                          {proj.pending && (
                            <Box sx={{
                              position: 'absolute',
                              top: 8,
                              right: 12,
                              bgcolor: '#fef3c7',
                              color: '#d97706',
                              fontSize: 11,
                              fontWeight: 700,
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              border: '1px solid #fed7aa',
                              zIndex: 1,
                            }}>
                              承認待ち
                            </Box>
                          )}
                          <Typography fontSize={12} fontWeight={600} color="#1f2937" sx={{ mb: 0.5 }}>{proj.name}</Typography>
                          {/* 判定基準チェックリスト */}
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2, mt: 0.5, mb: 0.5 }}>
                            {proj.criteria.map((item, idx) => (
                              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, lineHeight: 1.1 }}>
                                {item.status === 'complete' && (
                                  <span style={{ color: '#10b981', fontSize: 15, display: 'flex', alignItems: 'center' }}>✓</span>
                                )}
                                {item.status === 'warning' && (
                                  <span style={{ color: '#d97706', fontSize: 15, display: 'flex', alignItems: 'center' }}>!</span>
                                )}
                                {item.status !== 'complete' && item.status !== 'warning' && (
                                  <span style={{ color: '#9ca3af', fontSize: 15, display: 'flex', alignItems: 'center' }}>●</span>
                                )}
                                <Typography fontSize={12} color={item.status === 'complete' ? '#10b981' : item.status === 'warning' ? '#d97706' : '#6b7280'} sx={{ lineHeight: 1.1 }}>
                                  {item.item}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                          <Box sx={{ position: 'absolute', right: 12, bottom: 10 }}>
                            <Box sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 2,
                              bgcolor: '#f8fafc',
                              color: '#6b7280',
                              fontSize: 11,
                              fontWeight: 600,
                              border: '1px solid #e5e7eb',
                            }}>
                              審査日：{proj.date}
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* 上段：1つの大きなカード内にプロジェクトカードを横並び */}
      <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={3} justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <EmojiEventsIcon sx={{ color: '#4D4D58' }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937' }}>アクティブプロジェクト</Typography>
          </Box>
          <Button size="small" variant="outlined" onClick={() => router.push('/idea-studio')}>詳細を見る</Button>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {projects.slice(0, 3).map((project, idx) => (
            <Card key={project.id} sx={{
              height: 200,
              p: 2.5,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                borderColor: '#2590FD',
                background: 'linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%)',
                boxShadow: '0 8px 25px rgba(37, 144, 253, 0.15)',
                transform: 'translateY(-4px)',
              },
            }}
            onClick={() => router.push(`/projects/${project.id}`)}
            >
              {/* ヘッダー：アイコンとタイトル */}
              <Box display="flex" alignItems="flex-start" gap={1.5} mb={2}>
                <Box sx={{ 
                  fontSize: 24, 
                  width: 40, 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  borderRadius: 2,
                  bgcolor: '#f8faff',
                  border: '1px solid #e1e5e9'
                }}>
                  {project.icon}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: 16,
                      lineHeight: 1.4,
                      color: '#1f2937',
                      mb: 0.5,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
                    最終更新: {project.lastUpdated}
                  </Typography>
                </Box>
              </Box>

              {/* ステータス情報 */}
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Box sx={{ 
                  fontSize: 11, 
                  px: 1.5, 
                  py: 0.5, 
                  borderRadius: 2, 
                  bgcolor: '#f3f4f6', 
                  color: '#6b7280', 
                  fontWeight: 600,
                  border: '1px solid #e5e7eb'
                }}>
                  {project.stage}
                </Box>
                <Box sx={{ 
                  fontSize: 11, 
                  px: 1.5, 
                  py: 0.5, 
                  borderRadius: 2, 
                  bgcolor: '#dbeafe', 
                  color: '#2590FD', 
                  fontWeight: 600,
                  border: '1px solid #bfdbfe'
                }}>
                  ステージ{idx + 1}
                </Box>
              </Box>

              {/* プログレスバー */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12, fontWeight: 600 }}>
                    進捗
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12, fontWeight: 600 }}>
                    {project.progress}%
                  </Typography>
                </Box>
                <Box sx={{ height: 8, borderRadius: 4, background: '#f3f4f6', overflow: 'hidden' }}>
                  <Box sx={{ 
                    width: `${project.progress}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg, #2590FD 0%, #6366f1 100%)',
                    transition: 'width 0.5s ease',
                    borderRadius: 4
                  }} />
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Card>

      {/* 中段：2カラム */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
        {/* 左：自社アセット・外部環境（SWOT分析＋トレンド） */}
        <Card sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2} justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <BusinessIcon />
              <Typography variant="h6" fontWeight={700}>自社アセット・外部環境</Typography>
            </Box>
            <Button size="small" variant="outlined" onClick={() => router.push('/assets')}>詳細を見る</Button>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
            <Box sx={{ p: 2, bgcolor: '#f0fdf4', borderRadius: 2, border: '1px solid #bbf7d0' }}>
              <Typography fontSize={12} fontWeight={700} color="#059669" mb={0.5}>Strengths 強み</Typography>
              <Typography fontSize={13} color="text.secondary">精密加工技術、品質管理システム、長期顧客関係</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: '#fef2f2', borderRadius: 2, border: '1px solid #fecaca' }}>
              <Typography fontSize={12} fontWeight={700} color="#dc2626" mb={0.5}>Weaknesses 弱み</Typography>
              <Typography fontSize={13} color="text.secondary">IT化の遅れ、マーケティング力不足、人材不足</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: '#eff6ff', borderRadius: 2, border: '1px solid #bfdbfe' }}>
              <Typography fontSize={12} fontWeight={700} color="#2563eb" mb={0.5}>Opportunities 機会</Typography>
              <Typography fontSize={13} color="text.secondary">DX需要増加、ESG対応ニーズ、中小企業支援政策</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: '#fffbeb', borderRadius: 2, border: '1px solid #fed7aa' }}>
              <Typography fontSize={12} fontWeight={700} color="#d97706" mb={0.5}>Threats 脅威</Typography>
              <Typography fontSize={13} color="text.secondary">人材獲得競争、原材料費高騰、海外競合参入</Typography>
            </Box>
          </Box>
          <Box sx={{ bgcolor: '#f8faff', border: '1px solid #e1e5e9', borderRadius: 2, p: 2, mt: 1 }}>
            <Typography fontSize={13} fontWeight={700} color="#6366f1" mb={0.5}>💡 注目トレンド</Typography>
            <Typography fontSize={13} color="text.secondary">中小企業向けDXソリューション市場が前年比23%成長</Typography>
          </Box>
        </Card>
        {/* 右：世の中の課題・欲望ボード（カテゴリチップ＋トレンド） */}
        <Card sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2} justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <TrackChangesIcon />
              <Typography variant="h6" fontWeight={700}>世の中の課題・欲望ボード</Typography>
            </Box>
            <Button size="small" variant="outlined" onClick={() => router.push('/problems')}>詳細を見る</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Box sx={{ px: 2, py: 1, bgcolor: '#fef2f2', color: '#dc2626', borderRadius: 2, fontSize: 13, fontWeight: 700, border: '1px solid #fecaca', textAlign: 'center', flex: 1 }}>
              緊急課題<br /><strong>12件</strong>
            </Box>
            <Box sx={{ px: 2, py: 1, bgcolor: '#fffbeb', color: '#d97706', borderRadius: 2, fontSize: 13, fontWeight: 700, border: '1px solid #fed7aa', textAlign: 'center', flex: 1 }}>
              重要課題<br /><strong>8件</strong>
            </Box>
            <Box sx={{ px: 2, py: 1, bgcolor: '#f0fdf4', color: '#059669', borderRadius: 2, fontSize: 13, fontWeight: 700, border: '1px solid #bbf7d0', textAlign: 'center', flex: 1 }}>
              機会領域<br /><strong>15件</strong>
            </Box>
          </Box>
          <Box sx={{ bgcolor: '#f8faff', border: '1px solid #e1e5e9', borderRadius: 2, p: 2, mb: 1 }}>
            <Typography fontSize={13} fontWeight={700} color="#ef4444" mb={0.5}>🔥 ホット課題</Typography>
            <Typography fontSize={13} color="text.secondary">製造業の人手不足解決、エネルギーコスト削減、品質管理自動化</Typography>
          </Box>
          <Box sx={{ bgcolor: '#f8faff', border: '1px solid #e1e5e9', borderRadius: 2, p: 2 }}>
            <Typography fontSize={13} fontWeight={700} color="#6366f1" mb={0.5}>📅 今週のヒアリング</Typography>
            <Typography fontSize={13} color="text.secondary">製造業D社（7/11）、小売業E社（7/13）- 新たな課題発見予定</Typography>
          </Box>
        </Card>
      </Box>

      {/* 下段：1カラム ステージゲート管理ダッシュボード */}
      <Card sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2} justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <StarIcon sx={{ color: '#4D4D58' }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: '#1f2937' }}>ステージゲート管理ダッシュボード</Typography>
          </Box>
          <Button size="small" variant="outlined" onClick={() => router.push('/stage-gate-management')}>詳細を見る</Button>
        </Box>
        
        {/* ロール表示と切り替え */}
        <Box sx={{ bgcolor: '#f8faff', borderRadius: 3, p: 3, border: '1px solid #e1e5e9' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography fontSize={14} fontWeight={600} color="#1f2937">
              {roleData[currentRole].icon} {roleData[currentRole].title}
            </Typography>
          </Box>
          
          {/* ロール切り替えボタン */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {([
              { key: 'owner', label: '🎯 プロジェクトオーナー', color: '#2590FD' },
              { key: 'approver', label: '🔍 承認者', color: '#10b981' }
            ] as const).map((role) => (
              <Box
                key={role.key}
                onClick={() => setCurrentRole(role.key)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: currentRole === role.key ? role.color : '#f8faff',
                  color: currentRole === role.key ? 'white' : '#4D4D58',
                  border: `1px solid ${currentRole === role.key ? role.color : '#e1e5e9'}`,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: currentRole === role.key ? role.color : '#e1f5fe',
                    color: currentRole === role.key ? 'white' : role.color,
                  }
                }}
              >
                {role.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* ロール別コンテンツ */}
        {getRoleContent()}
      </Card>
    </Box>
  );
}
