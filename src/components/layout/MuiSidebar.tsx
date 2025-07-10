"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import StarIcon from "@mui/icons-material/Star";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BusinessIcon from "@mui/icons-material/Business";
import PublicIcon from "@mui/icons-material/Public";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import MicIcon from "@mui/icons-material/Mic";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Breadcrumbs, { BreadcrumbItem, ProjectBreadcrumbs } from '@/components/Breadcrumbs';

const drawerWidth = 260;

const navItems = [
  {
    label: "メイン",
    items: [
      { text: "ダッシュボード", icon: <HomeIcon fontSize="small" />, path: "/" },
      { text: "アイデアスタジオ", icon: <LightbulbIcon fontSize="small" />, path: "/idea-studio", badge: 8 },
      { text: "ステージゲート管理", icon: <StarIcon fontSize="small" />, path: "/stage-gate-management", badge: 3 },
      { text: "新規アイデア創出", icon: <RocketLaunchIcon fontSize="small" />, path: "/start-mode" },
    ],
  },
  {
    label: "分析・調査",
    items: [
      { text: "自社アセット・外部環境", icon: <BusinessIcon fontSize="small" />, path: "/analysis" },
      { text: "課題・欲望ボード", icon: <TrackChangesIcon fontSize="small" />, path: "/problems" },
    ],
  },
  {
    label: "ツール・学習",
    items: [
      { text: "インタビューガイド", icon: <MicIcon fontSize="small" />, path: "/interview" },
      { text: "事業創造トレーニング", icon: <MenuBookIcon fontSize="small" />, path: "/training" },
      { text: "MORPHY検定", icon: <EmojiEventsIcon fontSize="small" />, path: "/morphy" },
      { text: "テンプレート", icon: <AssignmentIcon fontSize="small" />, path: "/templates" },
    ],
  },
];

const SIDEBAR_BORDER_COLOR_GLOBAL = '#2590FD';
const SIDEBAR_BORDER_COLOR_PROJECT = '#FF84F1'; // ピンク系に変更
const TEXT_MAIN_COLOR = '#4D4D58';

export default function MuiSidebar({ children, breadcrumbs, projectNav = false, projectInfo }: { children: React.ReactNode, breadcrumbs?: BreadcrumbItem[], projectNav?: boolean, projectInfo?: { name: string, stage?: string, progress?: number } }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // プロジェクトナビ用メニュー（プロジェクトホームを最上部に追加）
  const projectNavItems = [
    {
      label: "プロジェクト機能",
      items: [
        { text: "プロジェクトホーム", icon: <HomeIcon fontSize="small" />, path: "" },
        { text: "リーンキャンバス", icon: <AssignmentIcon fontSize="small" />, path: "canvas", badge: "6/9" },
        { text: "検証トラッカー", icon: <MenuBookIcon fontSize="small" />, path: "validation", badge: 15 },
        { text: "ステージゲート", icon: <StarIcon fontSize="small" />, path: "stage-gate", badge: "3/5" },
        { text: "プロジェクト統計", icon: <EmojiEventsIcon fontSize="small" />, path: "stats" },
      ],
    },
    // ... クイックアクション・管理はそのまま ...
    {
      label: "クイックアクション",
      items: [
        { text: "仮説を追加", icon: <LightbulbIcon fontSize="small" />, path: "hypothesis" },
        { text: "インタビュー予約", icon: <MicIcon fontSize="small" />, path: "interview" },
        { text: "プロトタイプ作成", icon: <RocketLaunchIcon fontSize="small" />, path: "prototype" },
        { text: "指標設定", icon: <BusinessIcon fontSize="small" />, path: "metrics" },
      ],
    },
    {
      label: "プロジェクト管理",
      items: [
        { text: "チーム共有", icon: <PublicIcon fontSize="small" />, path: "share" },
        { text: "レポート出力", icon: <TrackChangesIcon fontSize="small" />, path: "export" },
        { text: "プロジェクト設定", icon: <SettingsIcon fontSize="small" />, path: "settings" },
      ],
    },
  ];

  const sidebarBorderColor = projectNav ? SIDEBAR_BORDER_COLOR_PROJECT : SIDEBAR_BORDER_COLOR_GLOBAL;

  const navTo = (path: string) => {
    if (projectNav && projectInfo && projectInfo.name !== undefined) {
      // プロジェクトホームは空文字でルート遷移
      const base = `/projects/${encodeURIComponent(projectInfo.name)}`;
      router.push(path ? `${base}/${path}` : base);
    } else {
      router.push(path);
    }
  };

  const drawer = (
    <div>
      <Toolbar sx={{ minHeight: 64, px: 2, bgcolor: 'white' }}>
        <Box display="flex" alignItems="center" gap={2} sx={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 2, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 14 }}>IN</Box>
          <Typography variant="subtitle1" noWrap fontWeight={700} sx={{ color: TEXT_MAIN_COLOR }}>
            チーム名
          </Typography>
        </Box>
      </Toolbar>
      <div style={{ borderTop: `6px solid ${sidebarBorderColor}` }}></div>
      {(projectNav ? projectNavItems : navItems).map((section, idx) => (
        <Box key={section.label} mt={idx === 0 ? 2 : 3}>
          <Typography variant="caption" sx={{ color: TEXT_MAIN_COLOR, fontWeight: 500 }} pl={2} mb={1} display="block">
            {section.label}
          </Typography>
          <List>
            {section.items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={
                    projectNav && projectInfo &&
                    ((item.path === '' && pathname === `/projects/${encodeURIComponent(projectInfo.name)}`) ||
                    (item.path && pathname.endsWith(`/${item.path}`))) ||
                    (!projectNav && (pathname.endsWith(item.path) || pathname === item.path))
                  }
                  onClick={() => navTo(item.path)}
                  sx={{ minHeight: 36, py: 0.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 28, color: 'inherit', alignItems: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { fontSize: 14, color: TEXT_MAIN_COLOR, fontWeight: 500 } }} />
                  {item.badge && (
                    <Box ml={1} bgcolor="grey.200" color="text.secondary" px={1.2} borderRadius={2} fontSize={12} fontWeight={700} minWidth={20} textAlign="center">
                      {item.badge}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </div>
  );

  // AppBarのパンくずは常に表示（ProjectBreadcrumbsで動的生成）
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 0,
          borderBottom: 1,
          borderColor: 'divider',
          minHeight: 0,
        }}
        elevation={0}
      >
        <Toolbar sx={{ minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
          {/* 左側：パンくず（sm未満は非表示） */}
          <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }}>
            <ProjectBreadcrumbs />
          </Box>
          {/* 右側：通知・設定・ヘルプ・プロフィール */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <SettingsIcon />
            </IconButton>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <HelpOutlineIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleAvatarClick} size="small" sx={{ ml: 1 }}>
              <Avatar alt="ユーザー名" src="/avatar.png" sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleMenuClose}>プロフィール</MenuItem>
              <MenuItem onClick={handleMenuClose}>設定</MenuItem>
              <MenuItem onClick={handleMenuClose}>ログアウト</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar navigation"
      >
        {/* モバイル用Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* デスクトップ用Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          p: 0,
          bgcolor: 'grey.50',
          minHeight: '100vh',
        }}
      >
        <Toolbar sx={{ minHeight: 64 }} />
        {children}
      </Box>
    </Box>
  );
} 