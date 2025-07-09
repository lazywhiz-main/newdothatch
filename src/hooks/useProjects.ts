"use client";

import { useState, useEffect } from "react";

export interface Project {
  id: string;
  title: string;
  stage: "アイデア段階" | "検証中" | "開発中" | "完了";
  lastUpdated: string;
  progress: number;
  icon: string;
  description?: string;
  team?: string[];
  tags?: string[];
}

const STORAGE_KEY = "innovation-navigator-projects";

// 初期データ
const initialProjects: Project[] = [
  {
    id: "smart-inventory",
    title: "中小企業向けスマート在庫管理システム",
    stage: "検証中",
    lastUpdated: "2025/07/03",
    progress: 75,
    icon: "📦",
    description: "バーコードスキャンとAI需要予測で在庫管理を自動化",
    team: ["田中", "佐藤", "鈴木"],
    tags: ["AI", "在庫管理", "中小企業"]
  },
  {
    id: "ai-quality",
    title: "AI品質検査システム",
    stage: "開発中",
    lastUpdated: "2025/07/02",
    progress: 90,
    icon: "🔍",
    description: "画像認識AIによる製造ライン品質検査の自動化",
    team: ["山田", "高橋", "渡辺"],
    tags: ["AI", "品質管理", "製造業"]
  },
  {
    id: "energy-optimization",
    title: "エネルギー効率最適化プラットフォーム",
    stage: "アイデア段階",
    lastUpdated: "2025/06/28",
    progress: 25,
    icon: "⚡",
    description: "IoTセンサーとAIでエネルギー消費を最適化",
    team: ["伊藤", "中村"],
    tags: ["IoT", "エネルギー", "最適化"]
  },
  {
    id: "predictive-maintenance",
    title: "AIプレディクティブメンテナンス",
    stage: "検証中",
    lastUpdated: "2025/06/30",
    progress: 60,
    icon: "🔧",
    description: "機械学習で設備故障を事前予測",
    team: ["小林", "加藤", "吉田"],
    tags: ["AI", "メンテナンス", "予測"]
  },
  {
    id: "ar-support",
    title: "AR技術を活用したリモート技術サポート",
    stage: "アイデア段階",
    lastUpdated: "2025/06/25",
    progress: 15,
    icon: "🥽",
    description: "ARグラスで遠隔技術サポートを実現",
    team: ["井上", "松本"],
    tags: ["AR", "リモート", "サポート"]
  },
  {
    id: "supply-chain",
    title: "サプライチェーン可視化ダッシュボード",
    stage: "アイデア段階",
    lastUpdated: "2025/06/20",
    progress: 30,
    icon: "📊",
    description: "リアルタイムでサプライチェーン全体を可視化",
    team: ["斎藤", "山口", "松田"],
    tags: ["可視化", "サプライチェーン", "ダッシュボード"]
  }
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // 初期化時にlocalStorageからデータを読み込み
  useEffect(() => {
    const loadProjects = () => {
      try {
        if (typeof window === "undefined") {
          setProjects(initialProjects);
          setLoading(false);
          return;
        }
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProjects(JSON.parse(stored));
        } else {
          // 初回は初期データを保存
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
          setProjects(initialProjects);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
        setProjects(initialProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // プロジェクトを保存
  const saveProjects = (newProjects: Project[]) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
      }
      setProjects(newProjects);
    } catch (error) {
      console.error("Failed to save projects:", error);
    }
  };

  // プロジェクトを追加
  const addProject = (project: Omit<Project, "id" | "lastUpdated">) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0].replace(/-/g, '/')
    };
    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    return newProject;
  };

  // プロジェクトを更新
  const updateProject = (id: string, updates: Partial<Project>) => {
    const updatedProjects = projects.map(project =>
      project.id === id
        ? { ...project, ...updates, lastUpdated: new Date().toISOString().split('T')[0].replace(/-/g, '/') }
        : project
    );
    saveProjects(updatedProjects);
  };

  // プロジェクトを削除
  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    saveProjects(updatedProjects);
  };

  // プロジェクトを検索
  const searchProjects = (query: string) => {
    if (!query.trim()) return projects;
    
    const lowerQuery = query.toLowerCase();
    return projects.filter(project =>
      project.title.toLowerCase().includes(lowerQuery) ||
      project.description?.toLowerCase().includes(lowerQuery) ||
      project.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  // ステージでフィルタリング
  const filterByStage = (stage: Project["stage"] | "all") => {
    if (stage === "all") return projects;
    return projects.filter(project => project.stage === stage);
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
    searchProjects,
    filterByStage
  };
} 