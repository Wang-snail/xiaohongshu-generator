require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// GLM API 配置
const GLM_API_URL = 'https://nexus.itssx.com/api/claude_code/cc_glm';
const GLM_MODEL = 'glm-5';

// 文案生成接口
app.post('/api/generate', async (req, res) => {
  try {
    const { keyword, style = '种草' } = req.body;

    if (!keyword) {
      return res.status(400).json({ error: '请输入关键词' });
    }

    console.log('收到请求:', { keyword, style });

    // 生成标题
    const titlesPrompt = `你是一个小红书爆款标题专家。请根据关键词"${keyword}"，生成10个吸引人的小红书标题。

要求：
1. 标题要短小精悍（15-25字）
2. 使用emoji表情
3. 制造好奇心或紧迫感
4. 适合${style}风格

请直接输出10个标题，每行一个，不要编号。`;

    console.log('生成标题中...');
    const titlesResponse = await fetch(GLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: GLM_MODEL,
        prompt: titlesPrompt,
        stream: false
      })
    });

    console.log('标题响应状态:', titlesResponse.status);
    const titlesData = await titlesResponse.json();
    console.log('标题响应:', JSON.stringify(titlesData).substring(0, 200));

    const titles = titlesData.content?.split('\n').filter(t => t.trim()) || [
      `🔥 ${keyword}必看！这招绝了`,
      `💡 救命！${keyword}还有这种操作？`,
      `✨ ${keyword}天花板级别！`,
      `🎯 ${keyword}新手必看！`,
      `💪 ${keyword}这样做效果翻倍！`,
      `🌟 ${keyword}真实体验分享`,
      `📈 ${keyword}避坑指南`,
      `🎉 ${keyword}最全攻略！`,
      `❤️ ${keyword}真心推荐！`,
      `🔥 ${keyword}不知道就亏了！`
    ];

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

    console.log('生成正文中...');
    const contentResponse = await fetch(GLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: GLM_MODEL,
        prompt: contentPrompt,
        stream: false
      })
    });

    console.log('正文响应状态:', contentResponse.status);
    const contentData = await contentResponse.json();
    console.log('正文响应:', JSON.stringify(contentData).substring(0, 200));

    const contents = contentData.content?.split('===').filter(c => c.trim()) || [
      `===第一篇===\n\n姐妹们！今天必须给你们安利这个${keyword}！🔥\n\n我用了差不多一个月了，真心觉得不错！刚开始还踩了好多坑，后来慢慢摸索出门道了～\n\n首先，这个${keyword}真的很好上手，不需要什么基础。我第一次用的时候都惊呆了，这么简单吗？😂\n\n而且效果超级明显！我用了一周就看到变化了，身边的朋友都问我最近怎么了，说我状态好好～\n\n给你们几个小 tips：\n1️⃣ 一开始不要着急，慢慢来\n2️⃣ 记得每天都坚持\n3️⃣ 配合其他方法效果更好\n\n总之，这个${keyword}我超级推荐！💕 有问题评论区问我～`,
      `===第二篇===\n\n关于${keyword}，我踩过的坑都在这里了！😭\n\n姐妹们听我说！${keyword}真的有讲究，不是随便用的！我之前就是因为不了解，结果浪费了很多时间...\n\n但是！经过我不断摸索（踩坑），终于总结出了一些经验！✨\n\n📌 选对适合自己的最重要！\n每个人的情况都不一样，不要盲目跟风哦～\n\n📌 坚持是关键！\n三天打鱼两天晒网肯定不行，要持续坚持才能看到效果！\n\n📌 不要贪多！\n一步一步来，不要想着一下子就达到最好的效果～\n\n希望我的经验能帮到你们！有问题的姐妹可以在下面留言，我会一一回复的！💪`,
      `===第三篇===\n\n${keyword}天花板级别！这个必须收藏！🌟\n\n家人们！今天我要给你们分享一个关于${keyword}的超级干货！\n\n我花了好长时间研究这个，看了好多视频和文章，试了很多方法，终于找到了最适合的！\n\n说真的，这个${keyword}真的太绝了！我用过之后感觉打开了新世界的大门！🚀\n\n具体方法：\n第一步：先了解基础知识\n第二步：从简单开始尝试\n第三步：慢慢增加难度\n第四步：找到最适合自己的节奏\n\n记住哦，${keyword}不是一蹴而就的，需要时间和耐心！但是只要坚持下去，一定会看到效果的！💕\n\n有什么问题随时来找我哦，我会帮你们的！～`
    ];

    // 生成标签
    const tagsPrompt = `请根据关键词"${keyword}"，生成10个适合小红书的标签。

要求：
1. 与内容高度相关
2. 包含热门标签
3. 井号格式

请直接输出10个标签，用空格分隔。`;

    console.log('生成标签中...');
    const tagsResponse = await fetch(GLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: GLM_MODEL,
        prompt: tagsPrompt,
        stream: false
      })
    });

    console.log('标签响应状态:', tagsResponse.status);
    const tagsData = await tagsResponse.json();
    console.log('标签响应:', JSON.stringify(tagsData).substring(0, 200));

    const tags = tagsData.content?.split('\n')[0]?.split(' ').filter(t => t.trim()) || [
      `#${keyword}`, `#${keyword}分享`, `#${keyword}推荐`, `#小红书`, `#干货`, `#种草`, `#好物`, `#日常`, `#生活`, `#笔记`
    ];

    console.log('生成完成！');

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
    res.status(500).json({ 
      error: '生成失败，请重试',
      details: error.message 
    });
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
