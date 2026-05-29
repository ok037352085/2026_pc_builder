import React, { useState, useMemo } from "react";
import { BUILD_DATA, PRESET_BUILDS, ComponentCategory, ComponentOption } from "@shared/const";
import BuildDashboard from "@/components/BuildDashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cpu, Tv, Layers, HardDrive, Database, Wind, Zap, Box, 
  ExternalLink, Sparkles, RefreshCw, Check, AlertCircle, ShoppingBag, Gamepad2, Info
} from "lucide-react";
import { toast } from "sonner";

// 映射圖示
const iconMap: Record<string, React.ComponentType<any>> = {
  Cpu: Cpu,
  Tv: Tv,
  Layers: Layers,
  HardDrive: HardDrive,
  Database: Database,
  Wind: Wind,
  Zap: Zap,
  Box: Box,
};

export default function Home() {
  const totalBudget = 40000;

  // 預設選擇第一個推薦配置（極致效能 2K 遊戲神機）
  const [selectedComponents, setSelectedComponents] = useState<Record<string, string>>(() => {
    return { ...PRESET_BUILDS[0].components };
  });

  const [activeTab, setActiveTab] = useState<string>("all");

  // 計算目前選中零件的總價格
  const currentTotalPrice = useMemo(() => {
    let sum = 0;
    BUILD_DATA.forEach((cat) => {
      const selectedId = selectedComponents[cat.id];
      const option = cat.options.find((opt) => opt.id === selectedId);
      if (option) {
        sum += option.price;
      }
    });
    return sum;
  }, [selectedComponents]);

  // 套用推薦菜單
  const handleApplyPreset = (presetIdx: number) => {
    setSelectedComponents({ ...PRESET_BUILDS[presetIdx].components });
    toast.success(`已套用：${PRESET_BUILDS[presetIdx].name}`, {
      description: "系統儀表盤與效能指標已即時更新！",
      duration: 3000,
    });
  };

  // 單件更換
  const handleSelectComponent = (categoryId: string, optionId: string) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [categoryId]: optionId,
    }));
    
    const cat = BUILD_DATA.find(c => c.id === categoryId);
    const opt = cat?.options.find(o => o.id === optionId);
    if (opt) {
      toast.info(`已選擇零件：${opt.name}`, {
        description: `價格：$${opt.price.toLocaleString()} NTD`,
        duration: 2000,
      });
    }
  };

  // 重設為預設配置
  const handleReset = () => {
    setSelectedComponents({ ...PRESET_BUILDS[0].components });
    toast("配置已重設", {
      description: "已回復為推薦的極致效能 2K 遊戲神機配置。",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 賽博龐克科幻 Hero Banner */}
      <header className="relative w-full h-[360px] md:h-[420px] overflow-hidden flex items-center">
        {/* 背景大圖 */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663709635286/HxUdhus57TdNjwkiK4iRg3/cyberpunk_pc_hero-24Jvmpi4GeWeYHSg9MWCi5.webp" 
            alt="Futuristic Gaming PC" 
            className="w-full h-full object-cover object-center opacity-60 filter brightness-[0.7] contrast-[1.1]"
          />
          {/* 漸層遮罩，確保文字清晰 */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent"></div>
        </div>

        {/* Banner 內容 */}
        <div className="container relative z-10 space-y-4 max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-primary font-cyber">2026 NEXT-GEN HARDWARE GUIDE</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-foreground to-primary">
                40K 預算遊戲 PC
              </span>
              <br />
              <span className="text-secondary neon-text-cyan font-cyber">終極組裝互動指南</span>
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              專為遊戲玩家量身打造的 4 萬元新台幣組裝神單。結合最新一代硬體規格，提供即時效能模擬、預算佔比分析，並整合台灣兩大主流電商（原價屋、欣亞數位）詳細連結，助你輕鬆打造夢想主機！
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-mono bg-card/60 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded">
              <Badge variant="outline" className="border-secondary/50 text-secondary font-bold">預算</Badge>
              <span>$40,000 NTD</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono bg-card/60 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded">
              <Badge variant="outline" className="border-primary/50 text-primary font-bold">核心</Badge>
              <span>AMD AM5 + DDR5</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono bg-card/60 backdrop-blur-sm border border-border/50 px-3 py-1.5 rounded">
              <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 font-bold">定位</Badge>
              <span>2K 3A 遊戲順跑</span>
            </div>
          </div>
        </div>
      </header>

      {/* 主體內容區 */}
      <main className="container max-w-7xl py-10 space-y-12">
        {/* 頂部：推薦預設單快速切換 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/30 pb-3">
            <h2 className="text-lg font-bold tracking-wider text-secondary flex items-center gap-2 font-cyber">
              <Gamepad2 className="w-5 h-5" /> PRESET SCHEMES // 推薦套裝菜單
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="text-xs font-mono flex items-center gap-1.5 border-border/50 hover:border-primary/50"
            >
              <RefreshCw className="w-3.5 h-3.5" /> 重設配置
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRESET_BUILDS.map((preset, idx) => {
              const isSelected = JSON.stringify(preset.components) === JSON.stringify(selectedComponents);
              return (
                <Card 
                  key={idx} 
                  className={`cyber-card cursor-pointer bg-card/40 border-border/50 backdrop-blur-sm hover:bg-card/60 transition-all relative overflow-hidden ${
                    isSelected ? "border-primary shadow-[0_0_15px_rgba(255,0,127,0.1)]" : ""
                  }`}
                  onClick={() => handleApplyPreset(idx)}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-bold font-cyber px-2 py-0.5 rounded-bl">
                      ACTIVE // 使用中
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm md:text-base font-bold flex items-center gap-2">
                      <span className={isSelected ? "text-primary neon-text-pink" : "text-foreground"}>
                        {preset.name}
                      </span>
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground min-h-[32px] leading-relaxed">
                      {preset.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2 pb-4 flex justify-between items-center border-t border-border/20 mt-2">
                    <div className="text-xs text-muted-foreground">
                      估算總價：
                      <span className="text-base font-mono font-black text-secondary neon-text-cyan">
                        ${preset.totalPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] ml-0.5">NTD</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant={isSelected ? "default" : "outline"}
                      className={`h-7 text-xs font-cyber ${
                        isSelected ? "bg-primary hover:bg-primary/90" : "border-border/50 hover:border-primary/50"
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 mr-1" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
                      {isSelected ? "已套用" : "立即套用"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 中間：即時模擬儀表盤 */}
        <section className="space-y-4">
          <BuildDashboard 
            selectedComponents={selectedComponents} 
            categories={BUILD_DATA} 
            totalBudget={totalBudget} 
          />
        </section>

        {/* 下方：元件選擇區（互動卡片與電商連結） */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/30 pb-3">
            <div>
              <h2 className="text-lg font-bold tracking-wider text-secondary flex items-center gap-2 font-cyber">
                <ShoppingBag className="w-5 h-5" /> COMPONENT SELECTION // 零組件艙（可自訂替換）
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                點擊下方卡片即可即時替換零件，系統會即時重新計算價格、功耗與遊戲 FPS。
              </p>
            </div>

            {/* 類別篩選 */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-3 md:flex bg-muted/50 border border-border/30">
                <TabsTrigger value="all" className="text-xs font-cyber">全部零件</TabsTrigger>
                <TabsTrigger value="core" className="text-xs font-cyber">核心板卡</TabsTrigger>
                <TabsTrigger value="peripheral" className="text-xs font-cyber">機殼電供</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* 零件卡片清單 */}
          <div className="space-y-8">
            {BUILD_DATA.filter((cat) => {
              if (activeTab === "all") return true;
              if (activeTab === "core") return ["cpu", "gpu", "motherboard", "ram", "ssd", "cooler"].includes(cat.id);
              if (activeTab === "peripheral") return ["psu", "case"].includes(cat.id);
              return true;
            }).map((category) => {
              const IconComponent = iconMap[category.icon] || Cpu;
              const selectedOptionId = selectedComponents[category.id];
              const selectedOption = category.options.find(opt => opt.id === selectedOptionId) || category.options[0];

              return (
                <div key={category.id} className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground/90 tracking-widest font-cyber uppercase">
                    <IconComponent className="w-4 h-4 text-secondary" />
                    {category.name}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.options.map((option) => {
                      const isSelected = option.id === selectedOptionId;
                      return (
                        <Card 
                          key={option.id}
                          className={`cyber-card relative flex flex-col justify-between bg-card/30 border-border/40 backdrop-blur-sm hover:bg-card/50 transition-all ${
                            isSelected ? "border-secondary shadow-[0_0_15px_rgba(0,240,255,0.08)]" : ""
                          }`}
                          onClick={() => handleSelectComponent(category.id, option.id)}
                        >
                          {/* 選中狀態指示 */}
                          {isSelected && (
                            <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[9px] font-bold font-cyber px-2.5 py-0.5 rounded-bl">
                              EQUIPPED // 已裝備
                            </div>
                          )}

                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <Badge variant="outline" className="font-mono text-[10px] border-border/80 text-muted-foreground mb-1">
                                  {option.brand}
                                </Badge>
                                <CardTitle className="text-sm md:text-base font-bold text-foreground leading-snug">
                                  {option.name}
                                </CardTitle>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="text-xs text-muted-foreground">電商均價</div>
                                <div className="text-base font-mono font-black text-secondary neon-text-cyan">
                                  ${option.price.toLocaleString()}
                                </div>
                                <div className="text-[9px] text-muted-foreground font-mono">NTD</div>
                              </div>
                            </div>
                            <CardDescription className="text-xs text-muted-foreground/90 leading-relaxed mt-2">
                              {option.description}
                            </CardDescription>
                          </CardHeader>

                          {/* 規格參數表格 */}
                          <CardContent className="pb-3 pt-0">
                            <div className="p-3 rounded bg-background/40 border border-border/20 text-xs space-y-1.5 font-mono">
                              {Object.entries(option.specs).map(([key, val]) => (
                                <div key={key} className="flex justify-between border-b border-border/10 pb-1 last:border-0 last:pb-0">
                                  <span className="text-muted-foreground">{key}</span>
                                  <span className="text-foreground/90 font-medium text-right max-w-[180px] truncate">{val}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>

                          {/* 電商購買連結 */}
                          <CardFooter className="pt-2 pb-4 border-t border-border/20 flex flex-wrap gap-2 items-center justify-between">
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Info className="w-3.5 h-3.5 text-secondary" />
                              點選卡片即可即時更換此零件
                            </div>
                            
                            <div className="flex gap-2">
                              {option.links.map((link, lIdx) => (
                                <a 
                                  key={lIdx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()} // 防止觸發卡片選擇
                                  className="inline-flex items-center gap-1 text-[11px] font-medium bg-background/60 hover:bg-secondary/10 border border-border/60 hover:border-secondary/40 rounded px-2.5 py-1 text-muted-foreground hover:text-secondary transition-all"
                                >
                                  <span>{link.platform}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 底部 Footer */}
      <footer className="mt-auto border-t border-border/30 bg-card/40 backdrop-blur-md py-8">
        <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="text-sm font-bold tracking-wider text-primary font-cyber">
              CYBERPUNK PULSE // PC BUILDER
            </div>
            <p className="text-xs text-muted-foreground">
              本指南所載之硬體價格與規格為 2026 年台灣原價屋與欣亞數位之市場參考均價，實際售價以電商平台當日標示為準。
            </p>
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            DESIGNED BY MANUS AGENT // May 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
