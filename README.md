# vite-plugin-vue-web-docs

vue 可以使用的组件文档插件。

# Install

```bash
npm install vue-plugin-vue-web-docs --save-dev
```

# Usage

```javascript
webDocPlugin({
  docs: {
    docs: {
      title: '文档',
      link: '/docs/introduction',
      menuOptions: [
        {
          name: 'introduction',
          label: '介绍',
          type: 'group',
          children: [
            {
              name: 'introduction',
              label: 'Vue Admin',
              path: '/introduction'
            }
          ]
        }
      ]
    },
    components: {
      title: '组件',
      link: '/components/button',
      menuOptions: [
        {
          name: 'components',
          label: '通用组件',
          type: 'group',
          children: [
            {
              name: 'button',
              label: '按钮',
              path: '/button'
            }
          ]
        },
        {
          name: 'my-components',
          label: '我的组件',
          type: 'group',
          children: [
            {
              name: 'schema-form',
              label: 'schema表单',
              path: '/schema-form'
            }
          ]
        }
      ]
    }
  }
})
```
