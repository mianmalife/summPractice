import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/summPractice/',
  title: "实践总结",
  description: "这是日常记录的一份文件",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'git', link: '/gitOperation/', activeMatch: '/gitOperation/' },
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
