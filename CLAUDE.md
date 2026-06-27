# CLAUDE.md — Timix 观察站

> Claude Code 项目上下文文件。每次会话自动加载。

---

## 项目概述

社区共建的 AI 中转站观测平台 —— 「大众点评」式的 AI API 中转站信息聚合站。

**在线**：http://www.1bex.com/
**仓库**：https://github.com/hfeng620-cmd/timin_api_test_and_forum.git

---

## 技术栈

| 层 | 技术 | 版本 |
|---|------|------|
| 框架 | Next.js (App Router) | 16.x |
| UI | React + Tailwind CSS | 19.x / 4.x |
| 语言 | TypeScript | 5.x |
| 后端 | Supabase (PostgreSQL + Auth + Storage + RLS) | — |
| 部署 | VPS (PM2) + GitHub Pages 备用 | — |

---

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页
│   ├── stations/           # 中转站榜单页
│   ├── community/          # 社区论坛页
│   ├── models/             # 模型页
│   ├── guides/             # 指南页
│   ├── admin/              # 管理员面板
│   └── profile/            # 个人主页
├── components/             # React 组件（40+ 个）
└── lib/                    # 工具函数和配置
    ├── supabase.ts         # Supabase 客户端
    ├── forum-auth.tsx      # 认证上下文
    ├── discussion-storage.ts  # 帖子数据操作
    └── site-data.ts        # 静态站点数据（fallback）

supabase/                   # SQL 迁移脚本
├── forum-schema.sql        # 论坛核心表 + RLS
├── owner-schema.sql        # 站主/管理员系统
├── stations-schema.sql     # 中转站榜单表
├── notifications-schema.sql
├── presence-schema.sql     # 在线状态
├── storage-setup.sql       # 图片/头像上传桶
└── ...
```

---

## 常用命令

```bash
npm run dev -- -p 3001      # 本地开发（端口 3001）
npm run build               # 生产构建
npm run lint                # ESLint 检查
npm run lint -- --fix       # 自动修复
```

---

## 环境变量

```bash
cp .env.example .env.local  # 复制模板后填入 Supabase 配置
```

| 变量 | 必需 | 说明 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase 匿名密钥（前端安全） |
| `DEPLOY_TARGET` | ❌ | 设为 `server` 启用 VPS 模式 |

---

## 数据库

Supabase 项目，SQL 迁移脚本在 `supabase/` 目录。初始化顺序：

1. `forum-schema.sql` → 论坛核心表 + RLS
2. `owner-schema.sql` → 站主/管理员系统
3. `presence-schema.sql` → 在线状态
4. `storage-setup.sql` → 图片/头像存储桶

### 核心表

| 表 | 用途 |
|---|------|
| `forum_profiles` | 用户资料 |
| `forum_posts` | 讨论帖 |
| `forum_replies` | 回复 |
| `forum_likes` | 点赞 |
| `forum_admins` | 管理员 |
| `site_owners` | 站主 |
| `stations` | 站点数据 |
| `station_reviews` | 站点评测 |
| `ai_news` | AI 新闻 |
| `user_presence` | 在线状态 |

---

## 角色权限

| 角色 | 权限 |
|---|------|
| 游客 | 看榜单、看讨论、看指南 |
| 注册用户 | 发帖、回复、点赞、改昵称、换头像 |
| 管理员 | 审核帖子/新闻、管理站点数据、管理用户 |
| 站主 | 全部权限 + 任命/移除管理员 |

---

## 开发规范

### 代码风格

- TypeScript，不用 `any`（除非必要）
- 函数式组件 + Hooks
- Tailwind CSS 样式，不写内联 style
- 提交前 `npm run lint` 确保无报错

### Git 提交规范

```
feat: 新增用户头像上传功能
fix: 修复评论区点赞计数不更新
docs: 更新 README 部署说明
style: 代码格式调整
refactor: 重构
perf: 性能优化
test: 测试相关
chore: 构建/工具链相关
```

### 分支策略

- `main` — 生产分支，推送自动部署
- `feature/xxx` — 新功能
- `fix/xxx` — 修复

---

## 部署

| 方式 | 命令 |
|------|------|
| VPS | `DEPLOY_TARGET=server npm run build` → PM2 启动 |
| GitHub Pages | 推 `main` 自动触发 GitHub Actions |
| Docker | `docker compose up -d` |

VPS 手动更新：
```bash
cd ~/timin_api_test_and_forum
git pull origin main
npm run build
pm2 restart timin
```

---

## ⚠️ Next.js 注意事项

> **This is NOT the Next.js you know**
>
> 本项目使用 Next.js 16，API、约定和文件结构可能与你训练数据中的版本不同。写代码前先读 `node_modules/next/dist/docs/` 中的指南。遵循弃用通知。
