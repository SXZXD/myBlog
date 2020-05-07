module.exports = {
  title: '独家记忆',
  description: '一条只能往前走的路叫时光！',
  base: '/zxd.github.io/',
  dest: 'public',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco',
  themeConfig: {
    displayAllHeaders: true,
    valineConfig: {
      appId: 'vbwRO7fgUjBMvDLwDzJwYeUK-9Nh9j0Va', // your appId
      appKey: 'KTDCONKnDEIXReq6xqSGnOt4', // your appKey
    },
    nav: [
      {
        text: '主页',
        link: '/',
        icon: 'reco-home',
      },
      {
        text: '时间线',
        link: '/timeLine/',
        icon: 'reco-date',
      },
      {
        text: '链接',
        icon: 'reco-message',
        items: [
          {
            text: '知乎',
            link: 'https://www.zhihu.com/people/zhang-xu-dong-5-16/activities',
            icon: 'reco-zhihu',
          },
          {text: '码云', link: 'https://gitee.com/Zdevote', icon: 'reco-mayun'},
        ],
      },
    ],
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: '分类',
      },
      tag: {
        location: 3,
        text: '标签',
      },
    },
    logo: '/head.jpg',
    search: true,
    searchMaxSuggestions: 10,
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
    author: 'Zhang XuDong',
    record: 'xxxx',
    startYear: '2017',
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    ['cursor-effects'],
    [
      'dynamic-title',
      {
        showIcon: '/favicon.ico',
        showText: '(/≧▽≦/)咦！又好了！',
        hideIcon: '/failure.ico',
        hideText: '(●—●)喔哟，崩溃啦！',
        recoverTime: 2000,
      },
    ],
    [
      '@vuepress-reco/vuepress-plugin-bgm-player', // BGM播放器
      {
        floatPosition: 'right',
        position:{
          right: '10px',
          bottom:'10px'
        },
        audios: [
          {
            name: '与我无关',
            artist: '阿冗',
            url:
              '/audio/与我无关.m4a',
            cover:
              'http://p1.music.126.net/x-jReyGkM5OTKUEtTqXGoA==/109951164597332931.jpg',
          },
          {
            name: '你的答案',
            artist: '阿冗',
            url:
              '/audio/你的答案.m4a',
            cover:
              'http://p2.music.126.net/OlX-4S4L0Hdkyy_DQ27zag==/109951164459621658.jpg',
          },
          {
            name: '国王与乞丐',
            artist: '华晨宇',
            url:
              '/audio/国王与乞丐.m4a',
            cover:
              'http://p1.music.126.net/UsSAd3Bdf77DjhCuTSEvUw==/109951163077613693.jpg',
          },
          {
            name: '麻雀',
            artist: '李荣浩',
            url:
              '/audio/麻雀.m4a',
            cover:
              'http://p2.music.126.net/TzlSVBiNtpRD2b7MT2Hi-w==/109951164527590793.jpg',
          },
          {
            name: '起风了',
            artist: '吴青峰',
            url:
              '/audio/起风了.m4a',
            cover:
              'http://p2.music.126.net/aMVPsO00OqlVTS2yMH8RgA==/109951163785600029.jpg',
          }
        ],
      },
    ],
    ['vuepress-plugin-smooth-scroll'], // 平滑滚动
    ['@vuepress/nprogress'], // 加载进度条
    ['reading-progress'], // 阅读进度条
    [
      "ribbon",
      {
        size: 90,     // width of the ribbon, default: 90
        opacity: 0.8, // opacity of the ribbon, default: 0.3
        zIndex: -1    // z-index property of the background, default: -1
      }
    ],
    ['go-top']
  ],
};
