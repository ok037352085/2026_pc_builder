export const COOKIE_NAME = "gaming_pc_session";
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export interface ComponentOption {
  id: string;
  name: string;
  brand: string;
  price: number;
  specs: Record<string, string>;
  description: string;
  links: {
    platform: string;
    url: string;
  }[];
  score: {
    gaming: number; // 遊戲效能 1-100
    cooling: number; // 散熱/功耗 1-100
    futureProof: number; // 未來升級性 1-100
    value: number; // CP值 1-100
  };
}

export interface ComponentCategory {
  id: string;
  name: string;
  icon: string;
  options: ComponentOption[];
}

export const BUILD_DATA: ComponentCategory[] = [
  {
    id: "cpu",
    name: "中央處理器 (CPU)",
    icon: "Cpu",
    options: [
      {
        id: "cpu-amd-7500f",
        name: "AMD Ryzen 5 7500F MPK",
        brand: "AMD",
        price: 4790,
        specs: {
          "核心/執行緒": "6核/12緒",
          "時脈": "3.7Ghz (可Boost至5.0Ghz)",
          "快取": "32MB L3 Cache",
          "功耗 (TDP)": "65W",
          "內顯": "無 (需搭配獨立顯示卡)",
          "腳位": "AM5 (支援DDR5)"
        },
        description: "目前中階遊戲 PC 的絕對高 CP 值王者。基本上就是拿掉內顯的 R5 7600，但價格更實惠。AM5 腳位保證了未來極佳的升級空間，遊戲效能極強，發熱量低。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 85, cooling: 90, futureProof: 95, value: 98 }
      },
      {
        id: "cpu-amd-9600x",
        name: "AMD Ryzen 5 9600X",
        brand: "AMD",
        price: 7900,
        specs: {
          "核心/執行緒": "6核/12緒",
          "時脈": "3.9Ghz (可Boost至5.4Ghz)",
          "快取": "32MB L3 Cache",
          "功耗 (TDP)": "65W",
          "內顯": "AMD Radeon Graphics (2CU)",
          "腳位": "AM5 (支援DDR5)"
        },
        description: "採用全新 Zen 5 架構，單核效能與能效比有顯著提升，適合除了遊戲之外，還需要輕度剪輯、生產力工作的玩家，且內建內顯方便除錯。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 92, cooling: 92, futureProof: 95, value: 82 }
      }
    ]
  },
  {
    id: "gpu",
    name: "獨立顯示卡 (GPU)",
    icon: "Tv",
    options: [
      {
        id: "gpu-rtx-4070-super",
        name: "華碩 DUAL-RTX4070S-O12G-EVO",
        brand: "ASUS",
        price: 21990,
        specs: {
          "記憶體": "12GB GDDR6X",
          "核心時脈": "2550 MHz (OC)",
          "散熱設計": "雙風扇 (軸向風扇)",
          "建議電源": "650W",
          "介面": "PCIe 4.0",
          "特色": "支援 DLSS 3.0 / 光線追蹤"
        },
        description: "2K 遊戲神卡。如果預算允許，將顯卡拉到 4070 Super 可以在 2K 解析度下特效全開順跑所有 3A 大作（如黑神話：悟空、電馭叛客2077）。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 98, cooling: 85, futureProof: 88, value: 85 }
      },
      {
        id: "gpu-rtx-5060",
        name: "微星 RTX 5060 VENTUS 2X 8G OC",
        brand: "MSI",
        price: 11990,
        specs: {
          "記憶體": "8GB GDDR7",
          "架構": "Blackwell",
          "散熱設計": "雙風扇",
          "建議電源": "550W",
          "介面": "PCIe 5.0",
          "特色": "支援全新 DLSS 4 / 節能能效"
        },
        description: "2026 年最新 Blackwell 架構主流顯卡，支援全新世代 DLSS 4 與光線追蹤技術。功耗極低，非常適合 1080p 特效全開或中高畫質 2K 遊戲。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 80, cooling: 95, futureProof: 90, value: 92 }
      }
    ]
  },
  {
    id: "motherboard",
    name: "主機板 (Motherboard)",
    icon: "Layers",
    options: [
      {
        id: "mb-gigabyte-b650m-gaming",
        name: "技嘉 B650M GAMING WIFI",
        brand: "GIGABYTE",
        price: 3690,
        specs: {
          "晶片組": "AMD B650",
          "尺寸": "Micro-ATX",
          "記憶體插槽": "2x DDR5 (最高支援96GB)",
          "網路": "2.5GbE 網路 + Wi-Fi 6E",
          "保固": "註冊五年保固"
        },
        description: "高 CP 值的 AM5 入門主機板，供電足以應付 R5 7500F 且帶有 Wi-Fi 6E 與藍牙，並提供五年保固，是預算有限下的最佳基石。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 80, cooling: 82, futureProof: 90, value: 95 }
      },
      {
        id: "mb-asus-tuf-b650m-plus",
        name: "華碩 TUF GAMING B650M-PLUS WIFI",
        brand: "ASUS",
        price: 4990,
        specs: {
          "晶片組": "AMD B650",
          "尺寸": "Micro-ATX",
          "記憶體插槽": "4x DDR5",
          "供電相數": "12+2 供電模組",
          "網路": "2.5GbE 網路 + Wi-Fi 6",
          "保固": "註冊五年保固"
        },
        description: "軍規級用料，散熱裝甲極為厚實，12+2 相供電未來即使升級到 9800X3D 也毫無壓力。提供 4 條 DDR5 插槽，擴充性更佳。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 85, cooling: 92, futureProof: 96, value: 88 }
      }
    ]
  },
  {
    id: "ram",
    name: "記憶體 (RAM)",
    icon: "HardDrive",
    options: [
      {
        id: "ram-adata-32g-6000",
        name: "威剛 ADATA XPG Lancer Blade DDR5-6000 32GB (16G*2) 雙通道",
        brand: "ADATA",
        price: 3199,
        specs: {
          "容量": "32GB (16GB x 2)",
          "時脈": "DDR5-6000",
          "時序": "CL30 (低延遲)",
          "散熱片": "矮版矮散熱片 (相容性佳)",
          "支援技術": "AMD EXPO / Intel XMP"
        },
        description: "DDR5 甜點頻率 6000MHz，且時序為極佳的 CL30 低延遲。矮版設計不卡塔散，提供流暢的遊戲幀率表現與多工處理能力。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 92, cooling: 88, futureProof: 90, value: 95 }
      }
    ]
  },
  {
    id: "ssd",
    name: "固態硬碟 (SSD)",
    icon: "Database",
    options: [
      {
        id: "ssd-kioxia-g3-2tb",
        name: "鎧俠 KIOXIA EXCERIA PLUS G3 2TB NVMe M.2 SSD",
        brand: "KIOXIA",
        price: 3690,
        specs: {
          "容量": "2TB",
          "讀取速度": "最高 5,000 MB/s",
          "寫入速度": "最高 3,900 MB/s",
          "介面": "PCIe Gen4 x4",
          "顆粒": "BiCS FLASH TLC",
          "保固": "五年保固"
        },
        description: "採用東芝優質 TLC 顆粒，品質極為穩定。2TB 超大容量足以塞下《GTA 6》、《黑神話：悟空》等多款 3A 遊戲，Gen4 速度讓載入時間近乎瞬間。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 90, cooling: 85, futureProof: 88, value: 96 }
      },
      {
        id: "ssd-kioxia-g3-1tb",
        name: "鎧俠 KIOXIA EXCERIA PLUS G3 1TB NVMe M.2 SSD",
        brand: "KIOXIA",
        price: 2190,
        specs: {
          "容量": "1TB",
          "讀取速度": "最高 5,000 MB/s",
          "寫入速度": "最高 3,900 MB/s",
          "介面": "PCIe Gen4 x4",
          "顆粒": "BiCS FLASH TLC",
          "保固": "五年保固"
        },
        description: "預算吃緊時的高 CP 值選擇。1TB 雖然空間較小，但同樣擁有 TLC 顆粒的穩定度與 Gen4 的高速效能，未來隨時可再加裝第二支 SSD。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 85, cooling: 85, futureProof: 80, value: 92 }
      }
    ]
  },
  {
    id: "cooler",
    name: "CPU 散熱器 (Cooler)",
    icon: "Wind",
    options: [
      {
        id: "cooler-thermalright-ag400",
        name: "利民 Thermalright Assassin King 120 SE (AK120 SE) 塔型散熱器",
        brand: "Thermalright",
        price: 690,
        specs: {
          "導熱管": "5支 6mm 導熱管",
          "風扇尺寸": "120mm PWM 風扇",
          "高度": "148mm (相容性高)",
          "特色": "逆重力熱導管設計"
        },
        description: "平民神塔，解熱能力高達 180W+。對付 7500F 的 65W 發熱量可謂輕輕鬆鬆，能讓 CPU 長時間維持在低溫與最高 Boost 頻率，運作時極為安靜。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 85, cooling: 95, futureProof: 80, value: 98 }
      }
    ]
  },
  {
    id: "psu",
    name: "電源供應器 (PSU)",
    icon: "Zap",
    options: [
      {
        id: "psu-montech-titan-750",
        name: "君主 Montech TITAN GOLD 750W 80+金牌 (全模組/ATX 3.0/PCIe 5.0)",
        brand: "Montech",
        price: 3690,
        specs: {
          "輸出功率": "750W",
          "轉換效率": "80 Plus 金牌認證",
          "線材設計": "全模組化線材",
          "規範": "ATX 3.0 / PCIe 5.0 (原生 12VHPWR 線)",
          "保固": "十年保固 / 雙滾珠風扇"
        },
        description: "頂級日系電容，支援最新 ATX 3.0 規範，提供原生 12VHPWR 線材，完美對接 40 系列與 50 系列顯卡。750W 留足了未來升級高階顯卡的餘裕，十年保固用得安心。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 85, cooling: 92, futureProof: 95, value: 90 }
      },
      {
        id: "psu-apexgaming-650",
        name: "首利 Apexgaming STR 650W 80+金牌 (全模組/ATX 3.0)",
        brand: "Apexgaming",
        price: 2490,
        specs: {
          "輸出功率": "650W",
          "轉換效率": "80 Plus 金牌認證",
          "線材設計": "全模組化",
          "規範": "ATX 3.0 / PCIe 5.0",
          "保固": "七年保固"
        },
        description: "預算導向的優質金牌電源。650W 足以應付 7500F + 4070 Super 或 5060，同樣支援 ATX 3.0，在 40K 預算內能省下一些預算移給其他零件。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 80, cooling: 85, futureProof: 80, value: 94 }
      }
    ]
  },
  {
    id: "case",
    name: "電腦機殼 (Case)",
    icon: "Box",
    options: [
      {
        id: "case-montech-air903-max",
        name: "君主 Montech AIR 903 MAX 黑 (E-ATX/內建ARGB風扇*4/Type-C)",
        brand: "Montech",
        price: 1890,
        specs: {
          "支援主機板": "E-ATX / ATX / M-ATX",
          "風扇配置": "前3後1 140mm ARGB高風量風扇 (內建)",
          "前置I/O": "USB 3.0 *2 / Type-C *1 / Audio",
          "散熱相容": "頂部支援 360mm 水冷 / 顯示卡限長 400mm"
        },
        description: "散熱之王。內建 4 顆 140mm ARGB 大風扇，風量極大且極靜音。超大內部空間，頂部支援 360 水冷，顯卡長度幾乎無限制，附帶 Type-C 接口，高 CP 值首選。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 85, cooling: 98, futureProof: 95, value: 96 }
      },
      {
        id: "case-montech-sky-two",
        name: "君主 Montech SKY TWO 黑色海景房 (ATX/玻璃側透/內建風扇*4)",
        brand: "Montech",
        price: 2390,
        specs: {
          "支援主機板": "ATX / M-ATX / Mini-ITX",
          "風扇配置": "側2下1後1 120mm ARGB風扇 (內建)",
          "材質": "雙面鋼化玻璃 (全景透側)",
          "前置I/O": "USB 3.0 *2 / Type-C *1 / Audio"
        },
        description: "超人氣海景房機殼。無 A 柱雙面鋼化玻璃設計，能 270 度完美展示內部 RGB 零件與顯示卡。內建 4 顆反向與正向 ARGB 風扇，兼顧美觀與風道散熱。",
        links: [
          { platform: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
          { platform: "欣亞數位", url: "https://www.sinya.com.tw/" }
        ],
        score: { gaming: 80, cooling: 88, futureProof: 90, value: 90 }
      }
    ]
  }
];

export const PRESET_BUILDS = [
  {
    name: "極致效能 2K 遊戲神機 (推薦配置)",
    description: "極限壓縮非效能零件預算，將顯卡推上 RTX 4070 Super，能在 2K 解析度下順跑所有 3A 大作與開啟光線追蹤，性價比破表！",
    totalPrice: 40538,
    components: {
      cpu: "cpu-amd-7500f",
      gpu: "gpu-rtx-4070-super",
      motherboard: "mb-gigabyte-b650m-gaming",
      ram: "ram-adata-32g-6000",
      ssd: "ssd-kioxia-g3-1tb",
      cooler: "cooler-thermalright-ag400",
      psu: "psu-apexgaming-650",
      case: "case-montech-air903-max"
    }
  },
  {
    name: "2026 最新世代均衡主流機 (黑潮海景房)",
    description: "採用 2026 最新 Blackwell 架構 RTX 5060 顯卡，搭配 2TB 超大硬碟與頂級 750W 電源、海景房機殼，外觀與擴充性拉滿，未來升級無痛！",
    totalPrice: 34139,
    components: {
      cpu: "cpu-amd-7500f",
      gpu: "gpu-rtx-5060",
      motherboard: "mb-asus-tuf-b650m-plus",
      ram: "ram-adata-32g-6000",
      ssd: "ssd-kioxia-g3-2tb",
      cooler: "cooler-thermalright-ag400",
      psu: "psu-montech-titan-750",
      case: "case-montech-sky-two"
    }
  }
];
