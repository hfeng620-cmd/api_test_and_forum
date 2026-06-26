# 开发指南

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/hfeng620-cmd/timin_api_test_and_forum.git
cd timin_api_test_and_forum
```

### 2. 安装依赖

```bash
# 推荐使用 Node 22（项目根目录有 .nvmrc）
nvm use  # 如果安装了 nvm
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入 Supabase 配置：

```
NEXT_PUBLIC_SUPABASE_URL=https://svksgdsuquhkwyliavfn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon key
```

> **注意**：Supabase anon key 是公开密钥，可以安全地放在前端使用。不要泄露 service_role key。

### 4. 启动开发服务器

```bash
npm run dev -- -p 3001
```

打开 http://localhost:3001

---

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── stations/          # 中转站榜单页
│   ├── community/         # 社区论坛页
│   ├── models/            # 模型页
│   ├── guides/            # 指南页
│   ├── admin/             # 管理员面板
│   └── profile/           # 个人主页
├── components/            # React 组件
│   ├── discussion-feed.tsx    # 论坛帖子列表
│   ├── stations-board.tsx     # 中转站榜单
│   ├── forum-auth-modal.tsx   # 登录注册弹窗
│   └── ...
└── lib/                   # 工具函数和配置
    ├── supabase.ts        # Supabase 客户端
    ├── forum-auth.tsx     # 认证上下文
    ├── discussion-storage.ts  # 帖子数据操作
    └── site-data.ts       # 静态站点数据
```

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.x | 前端框架 |
| React | 19.x | UI 库 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4.x | 样式 |
| Supabase | - | 数据库 + 认证 + 存储 |

---

## 开发规范

### 代码风格

- 使用 TypeScript，不要用 `any`（除非必要）
- 组件用函数式组件 + Hooks
- 样式用 Tailwind CSS，不要写内联 style
- 提交前运行 `npm run lint` 确保没有错误

### Git 提交规范

```
类型: 简短描述

类型包括：
- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- perf: 性能优化
- test: 测试相关
- chore: 构建/工具链相关
```

示例：
```
feat: 新增用户头像上传功能
fix: 修复评论区点赞计数不更新
docs: 更新 README 部署说明
```

### 分支策略

- `main` — 生产分支，推送到此分支会自动部署
- `feature/xxx` — 新功能分支
- `fix/xxx` — 修复分支

开发流程：
1. 从 `main` 创建分支：`git checkout -b feature/你的功能名`
2. 开发完成后提交 PR 到 `main`
3. 管理员审核后合并

---

## 数据库

项目使用 Supabase（PostgreSQL），所有表结构在 `supabase/` 目录下：

| 文件 | 用途 |
|------|------|
| `forum-schema.sql` | 论坛核心表（用户、帖子、回复、点赞） |
| `stations-schema.sql` | 中转站榜单表 |
| `owner-schema.sql` | 站主/管理员系统 |
| `notifications-schema.sql` | 通知系统 |
| `email-triggers.sql` | 邮件通知触发器 |

### 数据库权限

- **RLS（Row Level Security）** 已启用
- 普通用户只能读取和操作自己的数据
- 管理员可以审核帖子、管理站点
- 站主可以管理管理员

---

## 部署

### GitHub Pages（自动）

推送到 `main` 分支会自动触发 GitHub Actions 部署到 GitHub Pages。

### VPS 手动部署

```bash
cd ~/timin_api_test_and_forum
git pull origin main
npm run build
pm2 restart timin
```

### 环境变量

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 |
| `DEPLOY_TARGET` | 设为 `server` 启用服务器模式 |

---

## 常见问题

### Q: 如何获取 Supabase 访问权限？

联系项目管理员，将你的邮箱添加为 Supabase 项目的协作者。

### Q: 如何在本地测试管理员功能？

1. 在 Supabase Dashboard 中找到你的用户 UUID
2. 在 SQL Editor 中执行：
```sql
INSERT INTO public.forum_admins (user_id)
VALUES ('你的用户UUID')
ON CONFLICT (user_id) DO NOTHING;
```

### Q: 如何添加新的中转站？

两种方式：
1. **用户提交**：在网站上点击"提交新站点"，管理员审核后上线
2. **管理员直接添加**：在 Supabase Dashboard 的 `stations` 表中直接添加

### Q: 代码风格检查报错怎么办？

```bash
npm run lint        # 查看所有警告和错误
npm run lint -- --fix  # 自动修复可修复的问题
```

---

## 联系方式

- QQ 群：602190132
- GitHub Issues：https://github.com/hfeng620-cmd/timin_api_test_and_forum/issues
- GitHub Discussions：https://github.com/hfeng620-cmd/timin_api_test_and_forum/discussions
