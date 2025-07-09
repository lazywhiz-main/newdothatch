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

export default function Dashboard() {
  const { projects } = useProjects();
  const router = useRouter();

  // パンくずリストの定義は不要なので削除

  // ダミーデータ（本来はuseProjectsやAPIから取得）
  const stats = [
    { icon: "📊", color: "linear-gradient(135deg, #10b981, #059669)", label: "アクティブプロジェクト", value: 8, trend: "+2 今月", trendType: "up" },
    { icon: "⏱️", color: "linear-gradient(135deg, #f59e0b, #d97706)", label: "平均検証サイクル(日)", value: 12, trend: "-3日 短縮", trendType: "down" },
    { icon: "⭐", color: "linear-gradient(135deg, #6366f1, #8b5cf6)", label: "今月のゲート判定", value: 3, trend: "予定通り", trendType: "up" },
    { icon: "🎯", color: "linear-gradient(135deg, #ef4444, #dc2626)", label: "検証成功率", value: "75%", trend: "+5% 向上", trendType: "up" },
  ];

  const activeProjects = projects.slice(0, 5); // サンプル: 5件だけ表示

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* パンくずリストのBoxは削除 */}
      {/* 上段：1つの大きなカード内にプロジェクトカードを横並び */}
      <Card sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <EmojiEventsIcon />
          <Typography variant="h6" fontWeight={700}>アクティブプロジェクト</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {projects.slice(0, 3).map((project, idx) => (
            <Card key={project.id} sx={{
              p: 2,
              borderRadius: 2,
              minWidth: 0,
              flex: '1 1 calc(33.333% - 16px)',
              maxWidth: 'calc(33.333% - 16px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              mb: 2,
              boxShadow: 'none',
              border: '1px solid #e1e5e9',
              transition: 'box-shadow 0.2s, border-color 0.2s, background 0.2s, transform 0.2s',
              cursor: 'pointer',
              '&:hover': {
                borderColor: '#6366f1',
                background: '#f8faff',
                boxShadow: 3,
                transform: 'translateY(-2px)',
              },
            }}
            onClick={() => router.push(`/projects/${project.id}`)}
            >
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Box sx={{ fontSize: 16, lineHeight: 1.3, height: 1.3 * 16 + 'px', display: 'flex', alignItems: 'center' }}>{project.icon}</Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordBreak: 'break-all',
                    fontSize: 16,
                    lineHeight: 1.3,
                    maxWidth: '100%',
                  }}
                >
                  {project.title}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Box sx={{ fontSize: 12, px: 1.2, py: 0.3, borderRadius: 1, bgcolor: 'grey.100', color: 'text.secondary', fontWeight: 700 }}>
                  {project.stage}
                </Box>
                <Box sx={{ fontSize: 12, px: 1, py: 0.3, borderRadius: 1, bgcolor: 'primary.light', color: 'primary.main', fontWeight: 700 }}>
                  ステージ{idx + 1}
                </Box>
                <Typography variant="caption" color="text.secondary">最終更新: {project.lastUpdated}</Typography>
              </Box>
              <Box mb={1}>
                <Box sx={{ height: 8, borderRadius: 4, background: '#eee', overflow: 'hidden' }}>
                  <Box sx={{ width: `${project.progress}%`, height: '100%', bgcolor: 'primary.main', transition: 'width 0.3s' }} />
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" textAlign="right">{project.progress}%</Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Card>

      {/* 中段：2カラム */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
        {/* 左：自社アセット・外部環境（SWOT分析＋トレンド） */}
        <Card sx={{ p: 3, borderRadius: 3, flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <BusinessIcon />
            <Typography variant="h6" fontWeight={700}>自社アセット・外部環境</Typography>
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
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <TrackChangesIcon />
            <Typography variant="h6" fontWeight={700}>世の中の課題・欲望ボード</Typography>
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
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <StarIcon />
          <Typography variant="h6" fontWeight={700}>ステージゲート管理ダッシュボード</Typography>
        </Box>
        {/* ステージ進捗サマリー */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, mb: 2 }}>
          {[
            { num: 1, title: 'アイデア', count: 2 },
            { num: 2, title: 'コンセプト', count: 1 },
            { num: 3, title: '検証', count: 3, active: true },
            { num: 4, title: '開発', count: 1 },
            { num: 5, title: '市場投入', count: 1 },
          ].map(stage => (
            <Box key={stage.num} sx={{ textAlign: 'center', p: 2, borderRadius: 2, border: '1px solid #e1e5e9', bgcolor: stage.active ? '#f0fdf4' : '#fafafb', borderColor: stage.active ? '#10b981' : '#e1e5e9' }}>
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: stage.active ? '#10b981' : '#e1e5e9', color: stage.active ? 'white' : '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, mx: 'auto', mb: 1, fontSize: 14 }}>{stage.num}</Box>
              <Typography fontSize={12} fontWeight={600} color="#4b5563" mb={0.5}>{stage.title}</Typography>
              <Typography fontSize={11} color="#6b7280">{stage.count}プロジェクト</Typography>
            </Box>
          ))}
        </Box>
        {/* ゲート進捗プロジェクト一覧 */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 2 }}>
          {[
            { title: 'スマート在庫管理', stage: 'ゲート3 - 検証完了審査', date: '判定日: 7/15' },
            { title: 'AI品質検査', stage: 'ゲート4 - 開発Go/Kill', date: '判定日: 7/22' },
            { title: '予知保全システム', stage: 'ゲート3 - 検証中間審査', date: '判定日: 7/28' },
          ].map(proj => (
            <Box key={proj.title} sx={{ border: '1px solid #e1e5e9', borderRadius: 2, p: 2, bgcolor: '#fafafb' }}>
              <Typography fontSize={13} fontWeight={600} color="#1f2937" mb={0.5}>{proj.title}</Typography>
              <Typography fontSize={11} color="#6b7280" mb={1}>{proj.stage}</Typography>
              <Typography fontSize={11} color="#f59e0b" fontWeight={600}>{proj.date}</Typography>
            </Box>
          ))}
        </Box>
        {/* 今月のゲート判定予定 */}
        <Box sx={{ bgcolor: '#f8faff', border: '1px solid #e1e5e9', borderRadius: 2, p: 2 }}>
          <Typography fontSize={14} fontWeight={600} color="#1f2937" mb={1}>📅 今月のゲート判定予定</Typography>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid #e1e5e9' }}>
              <Typography fontSize={13} color="#4b5563">中小企業向けスマート在庫管理システム</Typography>
              <Typography fontSize={12} color="#f59e0b" fontWeight={600}>7/15 ゲート3</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid #e1e5e9' }}>
              <Typography fontSize={13} color="#4b5563">AI品質検査システム</Typography>
              <Typography fontSize={12} color="#f59e0b" fontWeight={600}>7/22 ゲート4</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
              <Typography fontSize={13} color="#4b5563">予知保全システム</Typography>
              <Typography fontSize={12} color="#f59e0b" fontWeight={600}>7/28 ゲート3</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
