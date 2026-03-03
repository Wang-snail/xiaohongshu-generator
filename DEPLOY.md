# 部署指南

## 本地运行

1. 配置API Key
```bash
cd /Users/woniu/.openclaw/workspace-q/projects/xiaohongshu-generator
# 编辑 .env 文件，填入你的 Anthropic API Key
```

2. 启动服务
```bash
./start.sh
# 或
npm start
```

3. 访问
```
http://localhost:3000
```

## Vercel 部署（推荐）

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 部署
```bash
cd /Users/woniu/.openclaw/workspace-q/projects/xiaohongshu-generator
vercel
```

3. 配置环境变量
在 Vercel Dashboard 设置：
- ANTHROPIC_API_KEY

## 测试

测试关键词：
- 护肤
- 健身
- 美食
- 穿搭

预期结果：
- 10个标题
- 3篇正文
- 10个标签
