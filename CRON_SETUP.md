# 小红书自动化运营 - 定时任务

## 任务定义

每天20:00执行小红书运营工作流

## 任务内容

1. 从关键词库随机选择3-5个关键词
2. 调用生成器API生成文案
3. 记录到飞书多维表
4. 发布到小红书（需要MCP）
5. 记录笔记链接

## 实现方式

由于 crontab 命令在环境中不稳定，建议使用以下方式之一：

### 方式1：OpenClaw Cron 任务

创建 agentTurn 类型的 cron 任务，每天20:00执行

### 方式2：手动触发

每天20:00手动触发工作流脚本

### 方式3：使用 n8n

通过 n8n 创建定时任务，每天20:00触发

## 脚本位置

/Users/woniu/.openclaw/workspace-q/scripts/xiaohongshu-workflow.sh

## 日志位置

/Users/woniu/.openclaw/workspace-q/logs/xiaohongshu.log

## 下一步

由于 crontab 添加遇到问题，建议：
1. 使用 OpenClaw 的 cron 系统创建任务
2. 或者手动执行脚本测试
3. 验证流程后再自动化
