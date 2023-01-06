<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useHostsStore } from '@/stores/hosts';
import { getDBData, revealHostsFile, saveToDB } from '@/common/utils';
import { SYSTEM_ID } from '@/common/config';
import useEditor from '@/monaco';
import type { editor } from 'monaco-editor';

const shortcutKey = utools.isMacOs() ? 'CMD+S' : 'CTRL+S';
const btnDisabled = ref(true);
const editorRef = ref();
const hostsStore = useHostsStore();

const { getSysHosts, common, setSysHosts, getHostsById, rules } = hostsStore;

let setEditorContent = (_content: string) => {};
let MonacoEditor: editor.IStandaloneCodeEditor | null = null;

// 原始内容
let originalHost = '';

// 设置编辑器内容
watch(
  () => hostsStore.currentId,
  (id) => {
    MonacoEditor?.updateOptions({ readOnly: id === SYSTEM_ID });
    originalHost = getDBData(hostsStore.currentId)?.content;
    setEditorContent(getHostsById(id).content);
  }
);

// 写入到 store
const onValueChange = (value: string) => {
  if (originalHost === value) return (btnDisabled.value = true);
  btnDisabled.value = false;

  hostsStore.currentId === common.id && (common.content = value);
  rules[hostsStore.currentId] && (rules[hostsStore.currentId].content = value);
};

// save data to local db
const save = () => {
  const id = hostsStore.currentId;
  originalHost = MonacoEditor?.getValue()!;
  btnDisabled.value = true;

  if (id === common.id) {
    setSysHosts();
    saveToDB(id, common);
  } else {
    saveToDB(id, rules[id]);
  }
};

function keydownToSave(e: KeyboardEvent) {
  if (btnDisabled.value || hostsStore.currentId === SYSTEM_ID) return;
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    // 执行save方法
    save();
    // 阻止默认事件
    e.preventDefault();
  }
}

onMounted(() => {
  document.addEventListener('keydown', keydownToSave, false);

  const { setContent, getEditor } = useEditor(editorRef, onValueChange);
  setEditorContent = setContent;
  MonacoEditor = getEditor();
  MonacoEditor?.updateOptions({ readOnly: hostsStore.currentId === SYSTEM_ID });
  // 默认显示系统 Hosts
  setContent(getSysHosts().content);
});

onUnmounted(() => {
  document.removeEventListener('keydown', keydownToSave, false);
});
</script>

<template>
  <div class="content">
    <div ref="editorRef" class="full"></div>

    <!-- 右侧 底部区域-->
    <div
      class="footer"
      :style="
        hostsStore.currentId === SYSTEM_ID ? '' : 'justify-content: flex-end'
      "
    >
      <template v-if="hostsStore.currentId === SYSTEM_ID">
        <p class="footer-local" @click="revealHostsFile">打开 hosts 文件</p>
        <p class="footer-status">只读，无法直接编辑</p>
      </template>
      <template v-else>
        <var-button type="primary" :disabled="btnDisabled" @click="save">
          保存（{{ shortcutKey }}）
        </var-button>
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
