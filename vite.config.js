const webDocPlugin = require('./plugins/vite-plugin-web-doc');

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  root: __dirname,
  plugins: [
    webDocPlugin({
      components: {
        SchemaForm: 'src/shared/components/schema-form/index.vue',
        DragBox: 'src/shared/components/drag-box/index.vue',
      },
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
                },
                {
                  name: 'drag-box',
                  label: '拖拽盒子',
                  path: '/drag-box'
                }
              ]
            }
          ]
        }
      }
    })
  ],
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  build: {
    outDir: 'site'
  }
};
