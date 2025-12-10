import type { CharacterType } from './types';

export const RESULTS: Record<string, CharacterType> = {
    // --- Group 1: Hot + Out (暴走族) ---
    'HOPK': {
        id: 'HOPK',
        name: 'The Tyrant',
        title: '暴君',
        catchphrase: "", // Removed use
        description: "あなたは、自分の欲望と感情にあまりにも忠実すぎる「暴君」タイプです。気に入らないことがあれば即座に顔や態度に出し、周囲を威圧してでも自分の意見を通そうとします。「論理」よりも「声の大きさ」や「感情の強さ」で物事を解決しようとする傾向があり、周りの人はあなたの顔色を伺って疲弊しきっています。リーダーシップがあると言えば聞こえはいいですが、それは単に誰もあなたに逆らえない空気を作っているだけかもしれません。自分の感情をコントロールし、他人の意見に耳を傾けることを覚えないと、気づいた時には裸の王様になっているでしょう。",
        traits: ["自己中", "暴君", "感情ダダ漏れ", "瞬間湯沸かし器"],
        color: '#FFB7B2',
        image: '/images/characters/hopk.jpg',
        bestMatch: 'HILK',
        worstMatch: 'CILS'
    },
    'HOPS': {
        id: 'HOPS',
        name: 'The Mad Dog',
        title: '狂犬',
        catchphrase: "",
        description: "あなたは、触れるものみな傷つける「狂犬」タイプです。集団行動が大の苦手で、組織のルールや常識に縛られることを極端に嫌います。気に入らない人間がいれば、相手が誰であろうと噛みつき、自分の正義や感情をぶつけます。その姿は一見すると「反骨精神のある一匹狼」に見えるかもしれませんが、周囲から見れば「ただの扱いにくい厄介者」です。協調性が皆無であるため、チームでの作業には向いていません。しかし、その爆発的なエネルギーと行動力は、誰にも真似できない突破力を生むこともあります。",
        traits: ["協調性皆無", "喧嘩っ早い", "反骨精神", "トラブルメーカー"],
        color: '#FFB7B2',
        image: '/images/characters/hops.jpg',
        bestMatch: 'HIPS',
        worstMatch: 'COLK'
    },
    'HOLK': {
        id: 'HOLK',
        name: 'The Bossy Manager',
        title: 'お局様',
        catchphrase: "",
        description: "あなたは、感情論で理屈を武装した「お局様」タイプです。一見すると論理的に話しているように聞こえますが、その根底にあるのは「私が気に入らない」という個人的な感情です。ルールやマナーに厳しく、他人の些細なミスを徹底的に指摘しますが、自分への甘さは天下一品です。「あなたのためを思って」という言葉を盾に、ネチネチと相手を追い詰めることに喜びを感じていませんか？周りをコントロールしたいという欲求が強く、自分の派閥を作りたがる傾向もあります。",
        traits: ["ダブルスタンダード", "陰湿", "マイルール", "過干渉"],
        color: '#FFB7B2',
        image: '/images/characters/holk.jpg',
        bestMatch: 'HIPK',
        worstMatch: 'HOPS'
    },
    'HOLS': {
        id: 'HOLS',
        name: 'The Resentful Critic',
        title: '論破厨',
        catchphrase: "",
        description: "あなたは、ネット弁慶な「論破厨」タイプです。リアルな人間関係ではそこまで攻撃的になれないこともありますが、安全圏やSNS上では水を得た魚のように攻撃的になります。相手の言葉尻を捉えて揚げ足を取り、論理的な正しさでマウントを取ることに快感を覚えます。しかし、その攻撃性は「構ってほしい」「自分の賢さを認めてほしい」という承認欲求の裏返しでもあります。議論に勝つことばかりにこだわって、肝心の人からの信頼や愛着を失っていませんか？",
        traits: ["屁理屈", "マウント", "ネット弁慶", "ひねくれ者"],
        color: '#FFB7B2',
        image: '/images/characters/hols.jpg',
        bestMatch: 'COLS',
        worstMatch: 'HOPK'
    },

    // --- Group 2: Hot + In (メンヘラ族) ---
    'HIPK': {
        id: 'HIPK',
        name: 'The Tragedy Queen',
        title: '悲劇のヒロイン',
        catchphrase: "",
        description: "あなたは、自分が世界の中心でないと気が済まない「悲劇のヒロイン」タイプです。「私はこんなに辛い思いをしている」「誰も私を分かってくれない」と嘆きながら、その実、可哀想な自分に酔いしれています。自責の念が強いように見えますが、それは「こんなに自分を責めている健気な私」をアピールするためのパフォーマンスかもしれません。周囲の関心や同情を引くために、無意識に問題を大きくしたり、体調不良を訴えたりする「かまってちゃん」な一面があります。",
        traits: ["かまってちゃん", "情緒不安定", "自己陶酔", "承認欲求強め"],
        color: '#C7CEEA',
        image: '/images/characters/hipk.jpg',
        bestMatch: 'HOPK',
        worstMatch: 'COPS'
    },
    'HIPS': {
        id: 'HIPS',
        name: 'The Self-Sacrifice Addict',
        title: '自己犠牲中毒',
        catchphrase: "",
        description: "あなたは、他人に依存し、依存されることでしか存在価値を見出せない「共依存」タイプです。相手に尽くすことが愛だと信じていますが、その実態は「見捨てられることへの恐怖」です。自分に自信がなく、パートナーや友人の顔色を常に伺い、相手の望む言葉や態度を先回りして演じます。その結果、相手を増長させ、ダメな異性や問題児を引き寄せてしまうことも。自分の幸せを他人に委ねるのをやめ、一人で立つ強さを持たない限り、沼から抜け出すことはできません。",
        traits: ["依存体質", "自己肯定感低め", "尽くしすぎ", "主体性ゼロ"],
        color: '#C7CEEA',
        image: '/images/characters/hips.jpg',
        bestMatch: 'HOPS',
        worstMatch: 'CIPS'
    },
    'HILK': {
        id: 'HILK',
        name: 'The Guilt Tripper',
        title: '自虐のカリスマ',
        catchphrase: "",
        description: "あなたは、過剰な謙遜と自虐で相手をコントロールする「自虐のカリスマ」タイプです。「私なんて全然ダメだから」と予防線を張りつつ、相手からの「そんなことないよ」待ちをしています。もし相手が否定してくれなければ、勝手に傷つき、無言の圧力をかけて相手に罪悪感を抱かせます。一見腰が低いようで、実はプライドが山のように高く、傷つくことを極端に恐れています。面倒くさい性格ナンバーワンと言っても過言ではありません。",
        traits: ["面倒くさい", "試すような態度", "隠れプライド", "被害者面"],
        color: '#C7CEEA',
        image: '/images/characters/hilk.jpg',
        bestMatch: 'HOLK',
        worstMatch: 'COLS'
    },
    'HILS': {
        id: 'HILS',
        name: 'The Negative Spiral',
        title: '限界オタク',
        catchphrase: "",
        description: "あなたは、自分の世界に引きこもり、ネガティブな妄想を膨らませ続ける「限界オタク」タイプです。推しや趣味への愛は深いですが、同時に現実世界への絶望も深いです。「どうセ自分なんて」が口癖で、行動する前から諦めています。しかし、その内面にはドロドロとした情熱や嫉妬心が渦巻いており、それをSNSの裏垢で吐き出していることも。現実と向き合うことを拒否し、心地よい絶望の中に安住してしまっています。",
        traits: ["ネガティブ", "現実逃避", "会話アレルギー", "卑屈"],
        color: '#C7CEEA',
        image: '/images/characters/hils.jpg',
        bestMatch: 'CILS',
        worstMatch: 'HOPK'
    },

    // --- Group 3: Cold + Out (支配者族) ---
    'COPK': {
        id: 'COPK',
        name: 'The Dictator',
        title: '独裁者',
        catchphrase: "",
        description: "あなたは、圧倒的な成果と恐怖で支配する「独裁者」タイプです。他人の感情など一切考慮せず、結果だけを求めます。「使えるか、使えないか」で人を判断し、無能だと判断すれば容赦なく切り捨てます。その冷徹な判断力と行動力はビジネスにおいては強力な武器になりますが、人間関係においては致命的です。あなたの周りには、恐怖で従っているイエスマンしか残らず、本当に困った時に助けてくれる人は誰もいないかもしれません。",
        traits: ["冷酷無比", "共感性ゼロ", "成果主義", "人間味ゼロ"],
        color: '#B5EAD7',
        image: '/images/characters/copk.jpg',
        bestMatch: 'CIPK',
        worstMatch: 'HIPS'
    },
    'COPS': {
        id: 'COPS',
        name: 'The Loss Cutter',
        title: '損切りマシーン',
        catchphrase: "",
        description: "あなたは、人生のすべてを「損得」で判断する「損切りマシーン」タイプです。人間関係も趣味も仕事も、少しでも「割に合わない」「将来性がない」と感じた瞬間に、容赦なく切り捨て（損切り）ます。「せっかくここまでやったのに」という情など1ミリも持ち合わせておらず、その判断スピードはまさに機械的。無駄を省いた効率的な生き方ですが、周囲からは「冷血人間」「計算高い」と恐れられ、気づけば周りに誰もいなくなっているかもしれません。",
        traits: ["効率厨", "スピード決断", "薄情", "リセット癖"],
        color: '#B5EAD7',
        image: '/images/characters/cops.jpg',
        bestMatch: 'COLS',
        worstMatch: 'HIPK'
    },
    'COLK': {
        id: 'COLK',
        name: 'The Manipulator',
        title: '詐欺師',
        catchphrase: "",
        description: "あなたは、巧みな話術と愛想で人の心を操る「詐欺師」タイプです。表向きは人当たりが良く、社交的に見えますが、その目の奥は笑っていません。相手が何を求めているかを瞬時に分析し、期待通りの自分を演じることができます。しかし、それは全て自分の利益のため。自分にとってメリットがないと判断すれば、掌を返したように冷淡になります。息をするように嘘をつき、自分すらも騙しているかもしれません。",
        traits: ["腹黒い", "八方美人", "嘘つき", "計算高い"],
        color: '#B5EAD7',
        image: '/images/characters/colk.jpg',
        bestMatch: 'CIPK',
        worstMatch: 'HOPS'
    },
    'COLS': {
        id: 'COLS',
        name: 'The Cynic',
        title: '冷笑家',
        catchphrase: "",
        description: "あなたは、世の中の全てを斜に構えて見ている「冷笑家」タイプです。熱くなっている人を見ると「必死だな(笑)」とバカにし、努力や友情といった青臭い価値観を否定します。自分は俯瞰して物事を見ている「賢い人間」だと思っていますが、実際は傷つくのが怖くて何かに本気になることを避けているだけです。批判ばかりして自分では何も生み出さない、安全圏からのコメンテーターになっていませんか？",
        traits: ["斜に構える", "評論家気取り", "高みの見物", "サブカル拗らせ"],
        color: '#B5EAD7',
        image: '/images/characters/cols.jpg',
        bestMatch: 'HOLS',
        worstMatch: 'HOPK'
    },

    // --- Group 4: Cold + In (悟り族) ---
    'CIPK': {
        id: 'CIPK',
        name: 'The Calculator',
        title: '黒幕',
        catchphrase: "",
        description: "あなたは、表舞台には出ず、裏から全てをコントロールしようとする「黒幕」タイプです。自己顕示欲を表に出すことは下品だと考えていますが、プライドの高さはエベレスト級です。自分が直接手を下すことなく、状況や環境を操作して、自分の思い通りの結果に導くことに喜びを感じます。一見大人しそうに見えますが、頭の中では常にシミュレーションが行われており、あなたの掌の上で踊らされている人は数知れません。",
        traits: ["策士", "秘密主義", "プライド高い", "腹の探り合い"],
        color: '#E2F0CB',
        image: '/images/characters/cipk.jpg',
        bestMatch: 'COPK',
        worstMatch: 'CIPS'
    },
    'CIPS': {
        id: 'CIPS',
        name: 'The Alien',
        title: '宇宙人',
        catchphrase: "",
        description: "あなたは、地球の常識が通用しない「宇宙人」タイプです。独自の価値観と論理で生きており、他人が何を考えているのか全く理解できないし、理解しようともしません。悪気なく失礼なことを言ったり、空気を凍らせる行動を取ったりしますが、本人には自覚がありません。孤独を感じることもなく、むしろ一人でいる方が快適。社会生活もギリギリですが、特定の分野では天才的な才能を発揮することもあります。",
        traits: ["変人", "我が道を行く", "空気読まない", "理解不能"],
        color: '#E2F0CB',
        image: '/images/characters/cips.jpg',
        bestMatch: 'CILS',
        worstMatch: 'HOLK'
    },
    'CILK': {
        id: 'CILK',
        name: 'The Nihilist',
        title: '虚無僧',
        catchphrase: "",
        description: "あなたは、全てにおいて意味を見出せない「虚無僧」タイプです。「どうせ死ぬのになぜ生きるのか」といった哲学的な問いに囚われ、世俗的な成功や幸福に価値を感じられません。感情の起伏が乏しく、常にローテンション。周囲からは「何を考えているか分からない」「暗い」と言われますが、あなたにとってそれは「静寂」であり、心地よい状態なのです。悟りを開いているようにも見えますが、単に生きるエネルギーが枯渇しているだけかもしれません。",
        traits: ["無気力", "ダウナー", "哲学的", "反応が薄い"],
        color: '#E2F0CB',
        image: '/images/characters/cilk.jpg',
        bestMatch: 'HILS',
        worstMatch: 'HOPK'
    },
    'CILS': {
        id: 'CILS',
        name: 'The Hermit',
        title: '仙人',
        catchphrase: "",
        description: "あなたは、俗世間との関わりを極限まで絶った「仙人」タイプです。他人に対する興味関心が皆無で、自分の内面世界や趣味に深く没入しています。誰かに理解されたいとも思わず、孤独であることを至上の喜びと感じています。社会的な雑音をシャットアウトし、静寂の中で生きていますが、周囲からは「存在感がない」「何を考えているか不明」と扱われがちです。",
        traits: ["引きこもり", "世捨て人", "低燃費", "影が薄い"],
        color: '#E2F0CB',
        image: '/images/characters/cils.jpg',
        bestMatch: 'HILS',
        worstMatch: 'HOPS'
    }
};
};
