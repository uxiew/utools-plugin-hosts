<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useHostsStore } from '@/stores/hosts';
import { revealHostsFile } from '@/common/utils';
import useEditor from '@/monaco';
import type { editor } from 'monaco-editor';

// const porps = defineProps<{ setContent: () => void }>;

const editorRef = ref();
const hostsStore = useHostsStore();

const { system, getHostsById, rules } = hostsStore;

let setEditorContent = (content: string) => {};
let MonacoEditor: editor.IStandaloneCodeEditor | null = null;

// 设置编辑器内容
watch(
  () => hostsStore.currentId,
  (id) => {
    console.log(id);
    MonacoEditor?.updateOptions({ readOnly: id === 'system' });
    setEditorContent(getHostsById(id).content);
  }
);

// 写入到 store
const onValueChange = (value: string) => {
  rules[hostsStore.currentId] && (rules[hostsStore.currentId].content = value);
};

onMounted(() => {
  const { setContent, getEditor } = useEditor(editorRef, onValueChange);
  setEditorContent = setContent;
  MonacoEditor = getEditor();
  // 默认显示系统 Hosts
  setContent(system.content);
});
</script>

<template>
  <div class="content">
    <div ref="editorRef" class="full"></div>

    <!-- 右侧 底部区域-->
    <div
      class="footer"
      :style="
        hostsStore.currentId === 'system' ? '' : 'justify-content: flex-end'
      "
    >
      <template v-if="hostsStore.currentId === 'system'">
        <p class="footer-local" @click="revealHostsFile">打开 hosts 文件</p>
        <p class="footer-status">只读，无法直接编辑</p>
      </template>
      <template v-else>
        <var-button type="primary">保存（CMD+S）</var-button>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.full {
  width: 100%;
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  #editor {
    height: calc(100% - 40px);
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  padding: 0 10px;
  padding-left: 5px;
  background-color: #fff;
  border-top: 1px solid #c6cbd1;

  &-local {
    color: var(--button-primary-color);
    cursor: pointer;
  }
  &-status {
    color: rgba(0, 0, 0, 0.55);
  }
}
</style>
