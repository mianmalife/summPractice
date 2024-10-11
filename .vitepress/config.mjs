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
      { text: 'Git', link: '/gitOperation/', activeMatch: '/gitOperation/' },
      { text: 'NodeJs', link: '/nodejs/', activeMatch: '/nodejs/' },
      { text: 'CSS', link: '/css/', activeMatch: '/css/' },
      { text: 'Examples', link: '/example/', activeMatch: '/example/' }
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
            { text: '实现继承', link: '/JavaScript/advanced' },
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
      '/example/': [{
        text: 'example',
        items: [
          { text: 'Markdown Examples', link: '/example/' },
          { text: 'Runtime API Examples', link: '/example/api-examples' }
        ]
      }]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
