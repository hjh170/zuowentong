# 作文通 · 优秀作文词句闯关

一个面向小学生的**词句积累闯关应用**。每天积累好词好句，让作文写得更漂亮。

**在线体验**

- Cloudflare Pages：https://zuowentong.pages.dev/
- GitHub Pages：https://hjh170.github.io/zuowentong/

## 形态与适配

- 纯前端单页应用，零外部依赖、无构建步骤；内容全部内置，不联网也能用
- **可安装为 App**：带 `manifest.webmanifest` + Service Worker，支持添加到主屏幕、离线打开
- 移动端优先（最大宽度 480px），支持安全区、系统深浅色自动切换、减少动效偏好

## 功能

| 模块 | 说明 |
| --- | --- |
| 今日好句 | 每天固定推荐一句好句，可一键朗读（浏览器语音合成） |
| 闯关 | 15 个关卡，按「小学低中年级 / 小学高年级 / 初中」三个学段分组，逐关解锁 |
| 题型 | 选词填空、词语排序成句、修辞判断、按词条出题等，答错扣爱心值（❤️） |
| 今日复习 | 按到期队列复习学过的词句，可只复习答错的题 |
| 好句宝库 | 全部好词好句、名言、按主题检索，支持朗读与收藏 |
| 范文欣赏 | 一二年级范文，含「好在哪 · 学一招」，可整篇朗读 |
| 仿写练习 | 按句式模板写自己的句子，存进「我的句子」 |
| 学习报告 | 通关进度、正确率、薄弱词句 Top 5、数据导出/导入 |
| 激励系统 | 连击 🔥、经验 ⭐、关卡星级、通关进度条 |

## 文件结构

```
zuowentong/
├── index.html              # 应用本体（样式、题库、交互逻辑）
├── manifest.webmanifest    # PWA 清单（名称、图标、启动方式）
├── sw.js                   # Service Worker（离线缓存）
├── icon-192.png            # 图标 192 × 192
├── icon-512.png            # 图标 512 × 512
├── icon-maskable-512.png   # 自适应图标（maskable）
├── icon-180.png            # iOS 主屏图标
├── make_icons.py           # 图标生成脚本（PIL）
├── smoke_test.js           # 冒烟测试：最小 DOM 桩跑通主要流程
├── README.md
├── LICENSE.md              # 授权协议（CC BY-NC 4.0）
└── .gitignore
```

## 运行方式

直接双击 `index.html` 即可使用（单文件模式，PWA 相关能力自动跳过）。

要完整体验安装与离线，需要走 http(s)：

```bash
cd zuowentong
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

部署到线上后，iOS Safari「分享 → 添加到主屏幕」、Android Chrome「安装应用」即可获得独立图标与全屏运行。

## 数据与进度

- 进度保存在浏览器 `localStorage`，当前键名 `zwt4`；首次运行会自动从旧版 `zwt3` / `zwt2` **迁移**，不会丢关卡与收藏
- 换浏览器、清缓存或隐私模式下进度不保留，页面会给出提示
- 学习报告页支持导出/导入 JSON 备份
- 朗读依赖系统中文语音（macOS / iOS 自带；部分安卓机需安装中文语音包）

## 开发与自测

```bash
node smoke_test.js     # 主要页面与答题流程冒烟（离线 DOM 桩）
python3 make_icons.py  # 重新生成图标
```

## 部署

- GitHub Pages：推送到 `main` 自动构建
- Cloudflare Pages（直接上传模式，暂未接 Git 自动构建）：

```bash
cd zuowentong
wrangler pages deploy . --project-name=zuowentong --branch=main
```

## 许可证

本项目采用 **CC BY-NC 4.0（署名-非商业性使用 4.0 国际）** 许可协议，详见 [LICENSE.md](LICENSE.md)。

- 可以：自由复制、分享、改编（含二次创作），需署名并说明是否修改
- 不可以：用于商业目的；不得附加额外限制
- 商业使用需另行取得著作权人书面授权
