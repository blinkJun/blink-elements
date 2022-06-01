import basicConfig,{file} from './rollup.default.config.js'
export default {
  ...basicConfig,
  output:{
    name:'blinkComponents', //全局变量名称
    file:file('umd'),
    format:'umd',
    globals:{
      'vue':'Vue'
    },
    exports:'named'
  }
}