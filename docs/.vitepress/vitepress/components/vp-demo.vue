<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useToggle } from '../composables/toggle'
import { useSourceCode } from '../composables/source-code'

import GithubIcon from './icons/github.vue'
import SourceCodeIcon from './icons/source-code.vue'
import CopyIcon from './icons/copy-icon.vue'

import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'

const props = defineProps({
  // source is encoded via encodeURIComponent
  source: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  demos: {
    type: Object,
    required: true,
  },
  rawSource: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
})

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible, setSourceVisible] = useToggle()
const demoSourceUrl = useSourceCode(toRef(props, 'path'))

// 匹配对应的示例
const formatPathDemos = computed(() => {
  const demos = {}

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('../../examples/', '').replace('.vue', '')] =
      props.demos[key].default
  })

  return demos
})

// 生成描述
const decodedDescription = computed(() => decodeURIComponent(props.description||''))


const copyCode = async () => {
  if (!isSupported) {
    alert('复制失败！')
  }
  try {
    await copy()
    alert('复制成功！')
  } catch (e: any) {
    alert(e.message)
  }
}
</script>

<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p class="example-description" v-html="decodedDescription" />
    <div class="example">
      <div class="op-btns">
        <a :href="demoSourceUrl" rel="noreferrer noopener" target="_blank">
          <GithubIcon />
        </a>
        <CopyIcon @click="copyCode" />
        <SourceCodeIcon @click="setSourceVisible" />
      </div>
      <Example :file="path" :demo="formatPathDemos[path]" />
      <SourceCode v-show="sourceVisible" :source="source" />
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.example-description {
  font-size: 14px;
}
.example {
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 3rem;
    line-height: 3rem;
    border-bottom:1px solid #eee;
    >svg,>a{
      width:20px;
      height:20px;
      line-height:1em;
      margin-left:20px;
      cursor:pointer;
      color: var(--text-color);
    }
  }
}
</style>
