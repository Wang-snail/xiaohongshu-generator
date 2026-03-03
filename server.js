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

// 风格指南
const STYLE_GUIDES = {
  '种草': '分享好物，强调使用体验、效果、性价比',
  '干货': '知识分享，强调实用性、可操作性、方法论',
  '测评': '客观评价，强调优缺点、对比、真实体验',
  '教程': '步骤教学，强调清晰、详细、易上手',
  '避坑': '揭示陷阱，强调经验教训、真实踩坑',
  '好物': '推荐好物，强调值得买、不踩雷、真香',
  '穿搭': '搭配分享，强调单品、搭配技巧、显瘦显高',
  '美妆': '美妆护肤，强调效果、教程、产品推荐',
  '美食': '美食探店，强调味道、环境、性价比',
  '家居': '家居好物，强调提升生活品质、实用',
  '学习': '学习方法，强调效率提升、笔记整理、考试技巧',
  '职场': '职场干货，强调工作效率、人际关系、晋升',
  '情感': '情感共鸣，强调情绪释放、认同感、治愈',
  '健身': '健身运动，强调坚持、效果、健康生活',
  '理财': '理财搞钱，强调副业、投资、省钱技巧',
  '旅行': '旅行攻略，强调小众、避坑、美食推荐',
  '萌宠': '萌宠日常，强调可爱、日常、宠物用品',
  '生活': '生活记录，强调日常、仪式感、生活态度'
};

// 随机数组工具
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 生成多样化的备用标题
function generateTitles(keyword) {
  const templates = [
    `❓ 为什么你的${keyword}没效果？真相在这`,
    `🤔 ${keyword}智商税？看完这篇再说`,
    `😱 ${keyword}的第${Math.floor(Math.random()*10)+1}个秘密`,
    `⚠️ 别买${keyword}！先看完这篇`,
    `💡 才发现！${keyword}还能这样用？`,
    `🔥 ${keyword}测评：第${Math.floor(Math.random()*5)+1}个让我震惊`,
    `❌ ${keyword}没用？那是你没看这篇`,
    `😤 ${keyword}的真相，${Math.floor(Math.random()*20)+10}岁才知道`,
    `🤫 ${keyword}的秘密，商家不会告诉你`,
    `🤔 你真的会用${keyword}吗？`
  ];
  return templates.sort(() => Math.random() - 0.5);
}

// 生成多样化的备用正文
function generateContents(keyword, style) {
  const times = ['3天', '1周', '1个月', '30天', '90天'];
  const people = ['闺蜜', '同事', '妈妈', '朋友', '网友'];
  const emotions = ['绝了', '破防', '真香', '震惊', '后悔', '笑死'];
  const numbers = ['3个', '5种', '10倍', '50%', '100块', '无数'];
  
  const randomTime = randomChoice(times);
  const randomPerson = randomChoice(people);
  const randomEmotion = randomChoice(emotions);
  const randomNumber = randomChoice(numbers);
  
  return [
    `===第一篇===\n\n家人们！我真的会谢🙏这个${keyword}让我${randomEmotion}了！\n\n用了${randomTime}，我${randomPerson}都说我状态完全不一样了😭\n\n说真的，一开始我觉得这就是个智商税💔结果试了一次...真的破防了！\n\n给你们${randomNumber}真实体验：\n✅ 效果明显\n✅ 性价比高\n✅ 容易上手\n\n最绝的是...我妈都夸我会买！🎉\n\n这个${keyword}真的绝了😭家人们快冲！\n\n有问题评论区问我～\n\n#${keyword} #好物 #真心推荐 #种草`,
    
    `===第二篇===\n\n救命🆘这个${keyword}让我后悔了...\n\n后悔没有早点买！！！😭😭😭\n\n姐妹们听我说！我之前踩了好多坑💔\n直到发现了这个${keyword}！\n\n说真的，一开始我也觉得"这不就是..."\n结果试了一次...我真的破防了😭\n\n看到效果：\n第${Math.floor(Math.random()*7)+1}天：感觉还行的样子\n第${Math.floor(Math.random()*20)+7}天：已经离不开它了\n第${Math.floor(Math.random()*30)+20}天：我朋友都问我用的什么\n\n这个${keyword}我给💯分！不接受反驳！\n\n家人们快去冲！💪\n\n评论区告诉我你们用了多久了～👇\n\n#${keyword} #真实体验 #好物 #测评`,
    
    `===第三篇===\n\n${keyword}天花板级别‼️这个必须收藏！\n\n家人们谁懂啊！这个${keyword}我真的用到老！🔥\n\n我花了${randomTime}研究这个${keyword}📚\n终于找到了最优解！✨\n\n说句大实话：\n❌ 90%的人都用错了\n✅ 正确的方法效果翻${randomNumber}\n\n举个真实例子：\n我${randomPerson}之前一直吐槽${keyword}🙄\n结果我教她正确方法后...她现在比我还积极！😂\n\n这个${keyword}真的绝了😭\n✅ 新手友好\n✅ 性价比超高\n✅ 效果立竿见影\n\n家人们别再交智商税了💰\n\n💡记得点赞收藏⭐不然刷着刷着就找不到了！\n\n#${keyword} #干货 #避坑指南 #好物分享`
  ];
}

// 生成多样化的备用标签
function generateTags(keyword) {
  const hotTags = ['#小红书', '#干货', '#种草', '#好物', '#日常', '#生活', '#笔记', '#真心推荐', '#测评', '#真实体验'];
  
  return [
    `#${keyword}`,
    `#${keyword}分享`,
    `#${keyword}推荐`,
    ...hotTags.sort(() => Math.random() - 0.5).slice(0, 7)
  ];
}

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

应用以下原理之一：
1. 认知缺口 - 为什么...、才发现...
2. 反常识 - 没人告诉你...、原来...
3. 冲突制造 - 千万别...、慎入...
4. 悬念设置 - 第3个...、最后一个...
5. 挑战质疑 - 没用？、出来挨打
6. 数字陷阱 - 3个...、90%的人...
7. 对比反差 - 便宜却...、免费比...
8. 预设陷阱 - 你以为...、别以为...

要求：15-25字，必须有emoji，必须引发思考，适合${style}风格

请直接输出10个标题，每行一个，不要编号。`;

    // 生成正文
    const styleGuidance = STYLE_GUIDES[style] || STYLE_GUIDES['种草'];
    const contentPrompt = `你是一个小红书千万粉丝博主。请根据关键词"${keyword}"和风格"${style}"，生成3篇完全不同的小红书笔记正文。

风格特点：${styleGuidance}

${customSection}

## 重要：每次生成都必须不同！
使用随机的开头、中间、结尾、角度、情绪、故事、数字、人物

## 开头冲击（随机选1个）：
- "家人们！我真的会谢"
- "救命🆘这个${keyword}让我后悔了"
- "破防了😭说个话"
- "绝了！这个${keyword}..."
- "不吹不黑，${keyword}真实体验"
- "${keyword}???我真的会谢"

## 随机元素：
- 时间：3天/1周/1个月/30天/90天
- 人物：闺蜜/同事/妈妈/朋友/网友
- 情绪：绝了/破防/哭死/笑死/真香/震惊
- 数字：3个/5种/10倍/50%/100块/无数

## 口语化词汇（随机使用）：
绝绝子、yyds、真的会谢、家人们、听我说、破防了、哭死、笑死、爱了、冲、必须冲、真香、智商税、踩坑、避雷、种草

## 要求：
1. 每篇280-350字
2. emoji至少15个
3. 分5-8段
4. 必须与${keyword}相关
5. 包含体验/效果/注意事项/推荐理由
6. 结尾必须有互动引导

请用"===第一篇===" "===第二篇===" "===第三篇==="分隔。`;

    // 生成标签
    const tagsPrompt = `请根据关键词"${keyword}"，生成10个适合小红书的标签。

要求：
1. 与内容高度相关
2. 包含热门标签
3. 井号格式

请直接输出10个标签，用空格分隔。`;

    // 调用API（添加超时控制）
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

    try {
      console.log('生成标题中...');
      const titlesResponse = await fetch(GLM_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: GLM_MODEL,
          prompt: titlesPrompt,
          stream: false
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // 如果 API 调用失败或超时，直接使用备用内容
      if (!titlesResponse.ok) {
        console.log('API调用失败，使用备用内容');
        const randomTitles = generateTitles(keyword);
        const randomContents = generateContents(keyword, style);
        const randomTags = generateTags(keyword);
        
        return res.json({
          success: true,
          data: {
            titles: randomTitles,
            contents: randomContents,
            tags: randomTags
          }
        });
      }

      const titlesData = await titlesResponse.json();
      const titles = titlesData.content?.split('\n').filter(t => t.trim()) || generateTitles(keyword);

    console.log('生成正文中...');
    const contentResponse = await fetch(GLM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: GLM_MODEL,
        prompt: contentPrompt,
        stream: false
      })
    });

    const contentData = await contentResponse.json();
    const contents = contentData.content?.split('===').filter(c => c.trim()) || generateContents(keyword, style);

    console.log('生成标签中...');
    const tagsResponse = await fetch(GLM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: GLM_MODEL,
        prompt: tagsPrompt,
        stream: false
      })
    });

    const tagsData = await tagsResponse.json();
    const tags = tagsData.content?.split('\n')[0]?.split(' ').filter(t => t.trim()) || generateTags(keyword);

    console.log('生成完成！');

    res.json({
      success: true,
      data: {
        titles: titles.slice(0, 10),
        contents: contents.slice(0, 3),
        tags: tags.slice(0, 10)
      }
    });

  } catch (error) {
    console.error('生成失败:', error);
    
    // 即使出错也返回多样化内容
    const randomTitles = generateTitles(keyword);
    const randomContents = generateContents(keyword, style);
    const randomTags = generateTags(keyword);
    
    res.json({
      success: true,
      data: {
        titles: randomTitles,
        contents: randomContents,
        tags: randomTags
      }
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
