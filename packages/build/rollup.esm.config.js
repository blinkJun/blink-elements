import basicConfig,{file,name} from './rollup.default.config.js'
export default {
  ...basicConfig,
  output:{
    name,
    file:file('esm'),
    format:'es'
  }
}