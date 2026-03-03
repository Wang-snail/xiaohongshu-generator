# Vercel 部署指南

## 自动部署（推荐）

1. **访问 Vercel**: https://vercel.com
2. **导入项目**: 点击 "Import Project" → 选择 GitHub 仓库
3. **配置项目**:
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: (留空)
   - Output Directory: (留空)
   - Install Command: `npm install`

4. **环境变量**:
   - 添加 `ANTHROPIC_API_KEY` (你的 Anthropic API Key)
   - 添加 `PORT` = `3000`

5. **部署**: 点击 "Deploy"

## 本地测试

```bash
cd /Users/woniu/.openclaw/workspace-q/projects/xiaohongshu-generator

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入 ANTHROPIC_API_KEY

# 启动服务
npm start
```

访问: http://localhost:3000

## 项目信息

- **GitHub**: https://github.com/Wang-snail/xiaohongshu-generator
- **Vercel**: 连接后自动部署
- **测试关键词**: 护肤、健身、美食、穿搭

## 下一步

1. 在 Vercel 部署项目
2. 获得公网 URL
3. 分享给测试用户
4. 开始收费测试
