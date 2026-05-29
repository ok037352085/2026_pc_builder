import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ComponentOption, ComponentCategory } from "@shared/const";
import { Cpu, Tv, Flame, TrendingUp, DollarSign, Zap, CheckCircle2, ShieldCheck, ShoppingCart } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, Tooltip } from "recharts";

interface BuildDashboardProps {
  selectedComponents: Record<string, string>;
  categories: ComponentCategory[];
  totalBudget: number;
}

export default function BuildDashboard({ selectedComponents, categories, totalBudget }: BuildDashboardProps) {
  // 找出目前選中的所有零件實體
  const activeComponents = useMemo(() => {
    const list: ComponentOption[] = [];
    categories.forEach((cat) => {
      const selectedId = selectedComponents[cat.id];
      const option = cat.options.find((opt) => opt.id === selectedId);
      if (option) {
        list.push(option);
      }
    });
    return list;
  }, [selectedComponents, categories]);

  // 計算總花費
  const totalPrice = useMemo(() => {
    return activeComponents.reduce((sum, item) => sum + item.price, 0);
  }, [activeComponents]);

  // 計算各項效能指標
  const metrics = useMemo(() => {
    if (activeComponents.length === 0) {
      return { gaming: 0, cooling: 0, futureProof: 0, value: 0 };
    }
    
    let totalGaming = 0;
    let totalCooling = 0;
    let totalFutureProof = 0;
    let totalValue = 0;

    activeComponents.forEach((comp) => {
      // 根據元件類別給予指標不同的權重 (例如 GPU 與 CPU 對遊戲效能權重最高)
      let weight = 1;
      if (comp.id.startsWith("gpu")) weight = 3;
      else if (comp.id.startsWith("cpu")) weight = 2;
      else if (comp.id.startsWith("ram")) weight = 1.5;

      totalGaming += comp.score.gaming * weight;
      totalCooling += comp.score.cooling;
      totalFutureProof += comp.score.futureProof;
      totalValue += comp.score.value;
    });

    const gpuCount = activeComponents.filter(c => c.id.startsWith("gpu")).length || 1;
    const cpuCount = activeComponents.filter(c => c.id.startsWith("cpu")).length || 1;
    const ramCount = activeComponents.filter(c => c.id.startsWith("ram")).length || 1;
    const totalGamingWeight = (gpuCount * 3) + (cpuCount * 2) + (ramCount * 1.5) + (activeComponents.length - gpuCount - cpuCount - ramCount);

    return {
      gaming: Math.round(totalGaming / totalGamingWeight),
      cooling: Math.round(totalCooling / activeComponents.length),
      futureProof: Math.round(totalFutureProof / activeComponents.length),
      value: Math.round(totalValue / activeComponents.length),
    };
  }, [activeComponents]);

  // 模擬熱門遊戲在當前配置下的預估 FPS 表現 (1080p 與 2K)
  const gameFpsEstimates = useMemo(() => {
    const hasGpu = activeComponents.find((c) => c.id.startsWith("gpu"));
    const hasCpu = activeComponents.find((c) => c.id.startsWith("cpu"));

    if (!hasGpu || !hasCpu) {
      return [];
    }

    const is4070S = hasGpu.id.includes("4070-super");
    const is5060 = hasGpu.id.includes("5060");

    // 基礎效能倍率
    let perfMultiplier = 1;
    if (is4070S) perfMultiplier = 1.6;
    else if (is5060) perfMultiplier = 1.1;

    return [
      {
        name: "黑神話：悟空 (3A大作/光追開啟)",
        fhd: Math.round(75 * perfMultiplier),
        qhd: Math.round(45 * perfMultiplier),
        settings: "畫質: 超高 / DLSS 啟動",
      },
      {
        name: "電馭叛客 2077 (光追/極致)",
        fhd: Math.round(90 * perfMultiplier),
        qhd: Math.round(55 * perfMultiplier),
        settings: "畫質: 櫻花 / 補幀開啟",
      },
      {
        name: "特戰英豪 (APEX / 競技射擊)",
        fhd: Math.round(280 * (is4070S ? 1.3 : 1.1)),
        qhd: Math.round(210 * (is4070S ? 1.3 : 1.1)),
        settings: "畫質: 競技 / 幀率無上限",
      },
    ];
  }, [activeComponents]);

  // 雷達圖數據
  const radarData = [
    { subject: "遊戲效能", A: metrics.gaming, fullMark: 100 },
    { subject: "散熱控溫", A: metrics.cooling, fullMark: 100 },
    { subject: "未來升級", A: metrics.futureProof, fullMark: 100 },
    { subject: "性價比", A: metrics.value, fullMark: 100 },
  ];

  // 圓餅圖數據 (預算分配)
  const pieData = useMemo(() => {
    return activeComponents.map((comp) => {
      const cat = categories.find((c) => c.options.some((o) => o.id === comp.id));
      return {
        name: cat?.name.split(" ")[0] || comp.name,
        value: comp.price,
      };
    });
  }, [activeComponents, categories]);

  const COLORS = ["#00f0ff", "#ff007f", "#00ff87", "#ffb700", "#a855f7", "#ec4899", "#3b82f6", "#10b981"];

  const budgetPercentage = Math.round((totalPrice / totalBudget) * 100);
  const isOverBudget = totalPrice > totalBudget;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 核心儀表盤：預算與效能綜覽 */}
      <Card className="cyber-card col-span-1 lg:col-span-2 bg-card/80 border-border/50 backdrop-blur-md overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary via-primary to-secondary"></div>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold tracking-wider text-secondary font-cyber">
                SYSTEM STATUS // 系統狀態儀表盤
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground font-mono mt-1">
                REAL-TIME SIMULATION & ANALYSIS
              </CardDescription>
            </div>
            <Badge variant={isOverBudget ? "destructive" : "secondary"} className="font-mono text-xs px-2 py-1 animate-pulse">
              {isOverBudget ? "預算超支 OVER BUDGET" : "預算安全 WITHIN BUDGET"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 預算進度條 */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                預算動態分配 ({budgetPercentage}%)
              </span>
              <span className="text-lg font-mono font-bold">
                <span className={isOverBudget ? "text-destructive" : "text-secondary"}>
                  ${totalPrice.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground font-normal"> / ${totalBudget.toLocaleString()} NTD</span>
              </span>
            </div>
            <div className="h-3 w-full bg-muted rounded-full overflow-hidden p-[1px] border border-border/30">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  isOverBudget 
                    ? "bg-gradient-to-r from-destructive to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                    : "bg-gradient-to-r from-secondary to-primary shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* 遊戲 FPS 實測預估 */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-semibold text-foreground/90 tracking-wider flex items-center gap-2 font-cyber">
              <Tv className="w-4 h-4 text-secondary" />
              GAME FPS ESTIMATION // 遊戲幀率模擬預估
            </h3>
            
            {gameFpsEstimates.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-border/40 rounded-lg text-muted-foreground text-sm">
                請至少選擇「CPU」與「顯示卡」以啟動 FPS 模擬器
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gameFpsEstimates.map((game, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-background/50 border border-border/30 hover:border-secondary/40 transition-colors">
                    <div className="text-xs font-bold text-foreground truncate mb-1">{game.name}</div>
                    <div className="text-[10px] text-muted-foreground mb-3 font-mono">{game.settings}</div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-background/80 p-2 rounded border border-border/20">
                        <div className="text-[10px] text-muted-foreground font-mono">1080p (FHD)</div>
                        <div className="text-lg font-mono font-black text-secondary neon-text-cyan">{game.fhd} <span className="text-xs font-normal">FPS</span></div>
                      </div>
                      <div className="bg-background/80 p-2 rounded border border-border/20">
                        <div className="text-[10px] text-muted-foreground font-mono">2K (QHD)</div>
                        <div className="text-lg font-mono font-black text-primary neon-text-pink">{game.qhd} <span className="text-xs font-normal">FPS</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 系統特點與優勢說明 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-secondary tracking-wider font-cyber mb-1">QUALITY GUARANTEE // 品質與保固優勢</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  本單精選華碩、技嘉、微星等一線大廠，主機板與顯示卡註冊皆享<strong> 5 年保固</strong>，電源供應器更是提供 <strong>7-10 年保固</strong>，安心暢玩免煩惱。
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-primary tracking-wider font-cyber mb-1">UPGRADE PATH // 未來升級潛力</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  全面採用 <strong>AMD AM5 平台與 DDR5 記憶體</strong>，腳位支援至少到 2027 年以上。未來無須更換主機板，即可直接升級全新世代 Ryzen 處理器。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 右側：互動圖表（效能雷達圖 + 預算比例餅圖） */}
      <div className="space-y-6 col-span-1">
        {/* 效能維度雷達圖 */}
        <Card className="cyber-card bg-card/80 border-border/50 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold tracking-wider text-primary flex items-center gap-2 font-cyber">
              <TrendingUp className="w-4 h-4" /> PERFORMANCE DIMENSIONS // 效能維度
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#64748b" }} axisLine={false} />
                <Radar
                  name="當前配置"
                  dataKey="A"
                  stroke="#ff007f"
                  fill="#ff007f"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 預算比例餅圖 */}
        <Card className="cyber-card bg-card/80 border-border/50 backdrop-blur-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold tracking-wider text-secondary flex items-center gap-2 font-cyber">
              <Flame className="w-4 h-4" /> BUDGET ALLOCATION // 預算佔比
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[200px]">
            {activeComponents.length === 0 ? (
              <div className="text-muted-foreground text-xs font-mono">NO DATA</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0.3)" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "rgba(20, 20, 25, 0.95)", borderColor: "rgba(255,255,255,0.1)", borderRadius: "6px" }}
                    itemStyle={{ color: "#fff", fontSize: "11px" }}
                    formatter={(value: number) => [`$${value.toLocaleString()} NTD`, "金額"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
            {/* 側邊標籤 */}
            <div className="flex flex-col gap-1 text-[10px] text-muted-foreground font-mono max-h-[180px] overflow-y-auto pr-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="truncate max-w-[80px]">{entry.name}</span>
                  <span className="text-foreground/70 font-bold ml-auto">${entry.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
