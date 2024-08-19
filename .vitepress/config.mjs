import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
        text: 'git命令',
        items: [
          { text: 'git', link: '/gitOperation/' },
          { text: 'git1', link: '/gitOperation/one' }
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
