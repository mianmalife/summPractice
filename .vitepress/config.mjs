import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/summPractice/',
  head: [['link', { rel: 'icon', href: '/summPractice/favicon.ico' }]],
  lastUpdated: true,
  title: "实践总结",
  description: "这是日常记录的一份文件",
  themeConfig: {
    logo: './logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Git', link: '/gitOperation/', activeMatch: '/gitOperation/' },
      { text: 'NodeJs', link: '/nodejs/', activeMatch: '/nodejs/' },
      { text: 'Examples', link: '/example/', activeMatch: '/example/' }
    ],
    sidebar: {
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
