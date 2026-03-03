require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 文案生成接口
app.post('/api/generate', async (req, res) => {
  try {
    const { keyword, style = '种草' } = req.body;

    if (!keyword) {
      return res.status(400).json({ error: '请输入关键词' });
    }

    // 生成标题
    const titlesPrompt = `你是一个小红书爆款标题专家。请根据关键词"${keyword}"，生成10个吸引人的小红书标题。

要求：
1. 标题要短小精悍（15-25字）
2. 使用emoji表情
3. 制造好奇心或紧迫感
4. 适合${style}风格

请直接输出10个标题，每行一个，不要编号。`;

    const titlesMessage = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [{ role: 'user', content: titlesPrompt }],
    });

    const titles = titlesMessage.content[0].text.split('\n').filter(t => t.trim());

    // 生成正文
    const contentPrompt = `你是一个小红书爆款文案专家。请根据关键词"${keyword}"，生成3篇小红书笔记正文。

要求：
1. 每篇200-400字
2. 口语化，像闺蜜聊天
3. 多用emoji
4. 分段清晰，易读
5. 适合${style}风格
6. 包含个人体验或干货

请用"===第一篇===" "===第二篇===" "===第三篇==="分隔。`;

    const contentMessage = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{ role: 'user', content: contentPrompt }],
    });

    const contents = contentMessage.content[0].text.split('===').filter(c => c.trim());

    // 生成标签
    const tagsPrompt = `请根据关键词"${keyword}"，生成10个适合小红书的标签。

要求：
1. 与内容高度相关
2. 包含热门标签
3. 井号格式

请直接输出10个标签，用空格分隔。`;

    const tagsMessage = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [{ role: 'user', content: tagsPrompt }],
    });

    const tags = tagsMessage.content[0].text.split('\n')[0].split(' ').filter(t => t.trim());

    res.json({
      success: true,
      data: {
        titles,
        contents,
        tags: tags.slice(0, 10)
      }
    });

  } catch (error) {
    console.error('生成失败:', error);
    res.status(500).json({ error: '生成失败，请重试' });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 根路径返回 index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
