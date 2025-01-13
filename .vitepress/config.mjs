import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/summPractice/',
  head: [['link', { rel: 'icon', href: '/summPractice/favicon.ico' }]],
  lastUpdated: true,
  title: "随记",
  description: "这是日常记录的一份清单",
  themeConfig: {
    logo: './logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Javascript', link: '/JavaScript/', activeMatch: '/JavaScript/' },
      { text: 'CSS', link: '/css/', activeMatch: '/css/' },
      { text: 'Git', link: '/gitOperation/', activeMatch: '/gitOperation/' },
      { text: 'NodeJs', link: '/nodejs/', activeMatch: '/nodejs/' },
      {
        text: 'Others',
        items: [{
          text: 'Docker',
          link: '/others/docker/',
          activeMatch: '/others/docker/'
        }]
      }
    ],
    sidebar: {
      '/JavaScript/': [
        {
          text: '基础',
          items: [
            { text: '基础语法', link: '/JavaScript/' },
          ],
        },
        {
          text: '手写类',
          items: [
            { text: '常见方法', link: '/JavaScript/advanced' },
            { text: '工具函数', link: '/JavaScript/tools' }
          ],
        }
      ],
      '/gitOperation/': [{
        text: '推送',
        items: [
          { text: '远程仓库地址设置与推送', link: '/gitOperation/' },
          { text: '...', link: '/gitOperation/one' }
        ]
      }],
      '/nodejs/': [{
        text: '基础',
        items: [
          { text: '基础模块', link: '/nodejs/' }
        ]
      }],
      '/css/': [{
        text: 'css3',
        items: [
          { text: 'css3渐变', link: '/css/' },
          { text: 'border边框', link: '/css/border' }
        ]
      }],
      '/others/docker/': [{
        text: '常用命令',
        items: [
          { text: 'Docker基础', link: '/others/docker/' },
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
