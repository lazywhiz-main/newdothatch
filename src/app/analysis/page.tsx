export default function AnalysisPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">環境分析</h1>
      <p className="text-gray-600 mb-6">自社アセットと外部環境を統合的に分析し、事業機会を発見します。</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 自社アセット分析 */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">🏢 自社アセット分析</h2>
          <p className="text-gray-600 mb-4">自社の強み・リソース・技術・人材などを分析</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <span className="font-medium">技術・ノウハウ</span>
              <span className="text-sm text-gray-500">分析中</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <span className="font-medium">人材・組織</span>
              <span className="text-sm text-gray-500">分析中</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <span className="font-medium">資金・財務</span>
              <span className="text-sm text-gray-500">分析中</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <span className="font-medium">ブランド・顧客関係</span>
              <span className="text-sm text-gray-500">分析中</span>
            </div>
          </div>
        </div>

        {/* 外部環境分析 */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4 text-green-600">🌍 外部環境分析</h2>
          <p className="text-gray-600 mb-4">市場・競合・技術トレンド・規制などを分析</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span className="font-medium">市場動向</span>
              <span className="text-sm text-gray-500">分析中</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span className="font-medium">競合分析</span>
              <span className="text-sm text-gray-500">分析中</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span className="font-medium">技術トレンド</span>
              <span className="text-sm text-gray-500">分析中</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span className="font-medium">規制・政策</span>
              <span className="text-sm text-gray-500">分析中</span>
            </div>
          </div>
        </div>
      </div>

      {/* 統合分析結果 */}
      <div className="mt-8 bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4 text-purple-600">🔍 統合分析結果</h2>
        <p className="text-gray-600 mb-4">自社アセットと外部環境の組み合わせから事業機会を発見</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <h3 className="font-semibold text-purple-800 mb-2">機会領域 1</h3>
            <p className="text-sm text-purple-700">自社の技術強み × 市場ニーズ</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <h3 className="font-semibold text-purple-800 mb-2">機会領域 2</h3>
            <p className="text-sm text-purple-700">人材リソース × 新規市場</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <h3 className="font-semibold text-purple-800 mb-2">機会領域 3</h3>
            <p className="text-sm text-purple-700">ブランド価値 × 技術トレンド</p>
          </div>
        </div>
      </div>
    </div>
  );
} 