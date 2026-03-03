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
    const titlesPrompt = `你是一个小红书千万粉丝博主兼认知心理学大师。请根据关键词"${keyword}"，生成10个让人忍不住思考、无法忽略的标题。

## 占用注意力的核心原理：

### 1. 认知缺口（Cognitive Gap）- 让大脑无法闭合
- 大脑不喜欢未完成的任务，必须知道答案
- 公式：为什么...、竟然...、才发现...

### 2. 反常识（Counter-Intuitive）- 打破固有认知
- 与预期相反，引发好奇
- 公式：没人告诉你...、竟然错了...

### 3. 冲突制造（Conflict Creation）- 制造矛盾对立
- 大脑无法忽视冲突
- 公式：千万别...、小心...、后悔...

### 4. 悬念设置（Suspense）- 延迟满足
- 不直接说答案，制造期待
- 公式：第3个没想到...、最后才...

### 5. 挑战质疑（Challenge）- 激发反驳欲
- 说错话让人纠正
- 公式：${keyword}没用？、你就是...

### 6. 数字陷阱（Number Trap）- 让人想数
- 给出数字，让人想验证
- 公式：3个...、5种...、90%...

### 7. 对比反差（Contrast Trap）- 制造认知失调
- 矛盾的信息，必须了解
- 公式：便宜但...、免费却...

### 8. 预设陷阱（Assumption Trap）- 挑战假设
- 让人怀疑自己的认知
- 公式：你以为...、别以为...

## 高级思考型标题公式：

**认知缺口类：**
- "为什么90%的人都用错了${keyword}？"
- "${keyword}的正确姿势，你真的知道吗？"
- "才发现！${keyword}还能这样用？"

**反常识类：**
- "${keyword}越...越好？大错特错！"
- "没人告诉你，${keyword}的这个秘密"
- "原来${keyword}一直都是错的？"

**冲突制造类：**
- "千万别买${keyword}！先看完这个"
- "${keyword}慎入！看完再决定"
- "后悔买了${keyword}？看这篇"

**悬念设置类：**
- "${keyword}测评：第3个让我震惊了"
- "试了10种${keyword}，只有这个..."
- "${keyword}的真相，最后一个没想到"

**挑战质疑类：**
- "${keyword}没用？那是你没看这篇"
- "说${keyword}是智商税的，出来挨打"
- "你真的会用${keyword}吗？"

**数字陷阱类：**
- "${keyword}的3个隐藏功能，第2个绝了"
- "90%的人不知道的${keyword}真相"
- "5个${keyword}误区，第3个最致命"

**对比反差类：**
- "免费的${keyword}，为什么比收费的还好？"
- "便宜的${keyword}，效果竟然吊打贵的？"
- "10块钱的${keyword}，凭什么卖100？"

**预设陷阱类：**
- "你以为${keyword}很简单？大错特错"
- "别以为${keyword}没用，是你不会用"
- "${keyword}智商税？看完这篇再说"

**提问引导类：**
- "为什么你的${keyword}没效果？"
- "${keyword}值不值得？看完再决定"
- "${keyword}到底怎么选？答案在这"

**情绪绑架类：**
- "看完这篇再决定买不买${keyword}"
- "${keyword}买了就后悔？先看这篇"
- "别花冤枉钱！${keyword}真相在这"

要求：
1. 15-25字
2. 必须有emoji
3. 必须引发思考/让人想知道答案
4. 适合${style}风格
5. 占用注意力，让人无法忽略

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
      `💔 别再浪费钱了！这个${keyword}才是真香`,
      `🔥 最后机会！${keyword}的隐藏功能我要藏不住了`,
      `😱 你绝对想不到，这个${keyword}竟然...`,
      `⚠️ ${keyword}的3个致命错误，90%的人都在犯`,
      `💰 省了5000！${keyword}的真实使用报告`,
      `🔥 朋友圈刷屏！${keyword}凭什么这么火？`,
      `📉 以为是智商税？${keyword}真香现场`,
      `😭 破防了！这个${keyword}让我哭死`,
      `🆘 救命！${keyword}的正确姿势竟然是...`,
      `💡 真相了！${keyword}商家不会告诉你的秘密`
    ];

    // 生成正文
    const contentPrompt = `你是一个小红书百万粉丝博主，精通爆款文案。请根据关键词"${keyword}"，生成3篇让人忍不住看完并收藏的笔记正文。

爆款文案结构：
1. 开头3秒抓住注意力（制造冲突、反常结果、情绪共鸣）
2. 中间讲故事或给干货（真实体验、具体数字、对比反差）
3. 结尾引导互动（提问、求评论、@朋友）

写作技巧：
- 第一句话必须有冲击力（"我后悔了"、"真的绝了"、"救命"）
- 用具体数字（不用"好用"，用"用了30天，皮肤亮了2个度"）
- 制造对比反转（"一开始觉得是智商税，结果..."）
- 用口语化词汇（绝绝子、yyds、真的会谢、家人们、听我说）
- 多用短句，每段2-3句话
- emoji密度要高，几乎每句都有

情绪词汇库：
- 绝了、救命、真的会谢、我不允许、破防了、哭死、笑死、爱了、冲、必须冲、不接受反驳

要求：
1. 每篇250-350字
2. 像闺蜜聊天，超级口语化
3. emoji密度高（至少15个）
4. 分段清晰，每段短
5. 必须有情绪词（绝了、救命、真的会谢等）
6. 适合${style}风格
7. 结尾必须有互动引导

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
      `===第一篇===\n\n家人们！我真的会谢🙏这个${keyword}我不允许还有人不知道！\n\n说实话，刚开始我觉得这就是个智商税💔结果用了一个月...我真香了！😭\n\n具体怎么用的给你们扒一下：\n1️⃣ 第一步：先做好功课（别像我一样瞎搞）\n2️⃣ 第二步：从最简单的开始（新手友好）\n3️⃣ 第三步：坚持30天（真的会看到变化！）\n\n我用到第三周的时候，我朋友都问我最近怎么了👀说我状态完全不一样了！\n\n真的绝了😭这个${keyword}让我少走了好多弯路！\n\n姐妹们快冲！不好用你们来打我👊\n\n对了💡有问题评论区问我，看到必回！\n\n#${keyword} #种草 #好物 #真心推荐`,
      `===第二篇===\n\n救命🆘这个${keyword}让我后悔了...\n\n后悔没有早点买！！！😭😭😭\n\n姐妹们听我说！我之前踩了好多坑💔买了很多没用的东西...直到我发现了这个${keyword}！\n\n说真的，一开始我也觉得"这不就是..."结果试了一次...我真的破防了😭\n\n给你们看看我的真实体验：\n✅ 第1天：感觉还行的样子\n✅ 第7天：已经离不开它了\n✅ 第30天：我朋友都问我用的什么\n\n最绝的是...我妈都夸我会买！🎉\n\n这个${keyword}我给💯分！不接受反驳！\n\n家人们快去冲！不好用来打我！💪\n\n评论区告诉我你们用了多久了～👇`,
      `===第三篇===\n\n${keyword}天花板级别‼️这个必须收藏！\n\n家人们谁懂啊！这个${keyword}我真的用到老！🔥\n\n我花了整整3个月研究这个${keyword}📚看了100+个视频，踩了无数坑...终于让我找到了最优解！✨\n\n说句大实话：\n❌ 90%的人都用错了\n✅ 正确的方法效果翻10倍\n\n给你们举个真实例子：\n我闺蜜之前一直吐槽${keyword}不好用🙄结果我教她正确方法后...她现在比我还积极！😂\n\n这个${keyword}真的绝了😭\n✅ 新手友好\n✅ 性价比超高\n✅ 效果立竿见影\n\n家人们别再交智商税了💰听我的一准没错！\n\n💡记得点赞收藏⭐不然刷着刷着就找不到了！\n\n#${keyword} #干货 #避坑指南 #好物分享`
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
