"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/hooks/useProjects";

interface LeanCanvasProps {
  project: Project;
  onBlockClick?: (blockName: string) => void;
}

export default function LeanCanvas({ project, onBlockClick }: LeanCanvasProps) {
  const canvasBlocks = [
    {
      name: "Problem",
      title: "Problem",
      content: "• 手作業による在庫管理でミスが多発\n• Excelでの管理は限界、リアルタイム性なし\n• 過剰在庫と欠品の両方が発生",
      completed: true,
      gridClass: "col-span-1 row-span-1"
    },
    {
      name: "Solution",
      title: "Solution",
      content: "• バーコードスキャンによる簡単入出庫\n• AI需要予測で発注タイミング自動提案\n• 直感的なダッシュボード",
      completed: true,
      gridClass: "col-span-1 row-span-1"
    },
    {
      name: "Key Metrics",
      title: "Key Metrics",
      content: "AIと共著で指標を決めましょう",
      completed: false,
      gridClass: "col-span-1 row-span-1"
    },
    {
      name: "Unique Value Proposition",
      title: "Unique Value Proposition",
      content: "中小企業でも「大企業並みの在庫最適化」を月額3万円から実現",
      completed: true,
      gridClass: "col-span-1 row-span-1"
    },
    {
      name: "Unfair Advantage",
      title: "Unfair Advantage",
      content: "独自性を明確にしましょう",
      completed: false,
      gridClass: "col-span-1 row-span-1"
    },
    {
      name: "Channels",
      title: "Channels",
      content: "顧客へのリーチ方法を検討",
      completed: false,
      gridClass: "col-span-1 row-span-1"
    },
    {
      name: "Customer Segments",
      title: "Customer Segments",
      content: "• 従業員10-100名の製造業\n• 在庫管理担当者\n• ITリテラシー中程度",
      completed: true,
      gridClass: "col-span-1 row-span-1"
    },
    {
      name: "Cost Structure",
      title: "Cost Structure",
      content: "コスト構造を整理しましょう",
      completed: false,
      gridClass: "col-span-2 row-span-1"
    },
    {
      name: "Revenue Streams",
      title: "Revenue Streams",
      content: "収益モデルを定義しましょう",
      completed: false,
      gridClass: "col-span-2 row-span-1"
    }
  ];

  return (
    <div className="p-8">
      {/* ヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
        <p className="text-gray-600">Lean Canvas - 最終更新: {project.lastUpdated}</p>
      </div>

      {/* Canvas Grid */}
      <div className="grid grid-cols-5 gap-4 min-h-[600px]">
        {canvasBlocks.map((block) => (
          <Card
            key={block.name}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
              block.completed 
                ? "border-green-500 bg-green-50" 
                : "border-gray-300 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50"
            } ${block.gridClass}`}
            onClick={() => onBlockClick?.(block.name)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                {block.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm text-gray-900 whitespace-pre-line">
                {block.content}
              </div>
              {!block.completed && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    未完成
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 