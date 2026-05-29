import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-lg border border-border/50 bg-card/50 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary via-primary to-secondary"></div>
        
        <AlertCircle className="w-16 h-16 text-primary mx-auto neon-text-pink animate-pulse" />
        
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-wider text-secondary font-cyber">404 ERROR</h1>
          <p className="text-sm text-muted-foreground font-mono">SYSTEM DISCONNECTED // 找不到此組裝艙</p>
        </div>
        
        <p className="text-xs text-muted-foreground leading-relaxed">
          抱歉，您所訪問的頁面已逸失在賽博空間中。請返回主控台重新配置您的 40000 元遊戲主機。
        </p>

        <div className="pt-4">
          <Link href="/">
            <Button className="w-full cyber-btn bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-cyber py-5">
              <ArrowLeft className="w-4 h-4 mr-2" /> 返回組裝主控台
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
