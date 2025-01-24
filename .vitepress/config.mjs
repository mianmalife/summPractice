import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/summPractice/',
  head: [['link', { rel: 'icon', href: '/summPractice/docs/favicon.ico' }]],
  lastUpdated: true,
  title: "随记",
  description: "这是日常记录的一份清单",
  themeConfig: {
    logo: './logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Javascript', link: '/docs/JavaScript/', activeMatch: '/docs/JavaScript/' },
      { text: 'CSS', link: '/docs/css/', activeMatch: '/docs/css/' },
      { text: 'Git', link: '/docs/gitOperation/', activeMatch: '/docs/gitOperation/' },
      { text: 'NodeJs', link: '/docs/nodejs/', activeMatch: '/docs/nodejs/' },
      {
        text: 'Others',
        items: [{
          text: 'Docker',
          link: '/docs/others/docker/',
          activeMatch: '/docs/others/docker/'
        }]
      }
    ],
    sidebar: {
      '/docs/JavaScript/': [
        {
          text: '基础',
          items: [
            { text: '基础语法', link: '/docs/JavaScript/' },
          ],
        },
        {
          text: '手写类',
          items: [
            { text: '常见方法', link: '/docs/JavaScript/advanced' },
            { text: '工具函数', link: '/docs/JavaScript/tools' }
          ],
        }
      ],
      '/docs/gitOperation/': [{
        text: '推送',
        items: [
          { text: '远程仓库地址设置与推送', link: '/docs/gitOperation/' },
          { text: '...', link: '/docs/gitOperation/one' }
        ]
      }],
      '/docs/nodejs/': [{
        text: '基础',
        items: [
          { text: '基础模块', link: '/docs/nodejs/' }
        ]
      }],
      '/docs/css/': [{
        text: '常见效果',
        items: [
          { text: '合集', link: '/docs/css/' },
        ]
      }],
      '/docs/others/docker/': [{
        text: '常用命令',
        items: [
          { text: 'Docker基础', link: '/docs/others/docker/' },
        ]
      }]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    lastUpdated: {
      text: '最后更新于'
    },
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '页面导航'
    }
  }
})
