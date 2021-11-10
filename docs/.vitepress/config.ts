import {mdPlugin} from './config/plugins'
import {HeadConfig} from 'vitepress'


export default {
  title: 'Blink-Elements',
  description: 'Just playing around.',
  markdown:{
    config:mdPlugin
  },
  head:[
    [
      'link',
      {
        rel: 'icon',
        href: '/images/logo.png',
      },
    ],
  ] as HeadConfig[],
  themeConfig: {
    logo: '/images/logo.png',
    nav: [
      { text: '指南', link: '/md/guide/',activeMatch: '^/guide/' },
      { text: '组件', link: '/md/components/',activeMatch: '^/components/' }
    ],
    sidebar:{
      '/md/guide/':[
        {
          text: '指南',
          children: [
            { 
              text: 'index', 
              link: '/md/guide/' 
            },
            { 
              text: 'button', 
              link: '/md/guide/button' 
            },
          ]
        }
      ],
      '/md/components/':[
        {
          text: '组件',
          children: [
            { 
              text: 'index', 
              link: '/md/components/' 
            },
            { 
              text: 'button', 
              link: '/md/components/button' 
            },
          ]
        }
      ]
    }
  },
}