<script setup lang="ts">
import { useHostsStore } from '@/stores/hosts';
import { useRulesStore } from '@/stores/rules';

const hostsStore = useHostsStore();
const rulesStore = useRulesStore();

const ACTION_TYPES = {
  ENABLE: 0,
  UPDATE: 1,
  DELETE: 2
};

const doAction = (id: string, type: number) => {
  const { rules } = hostsStore;
  switch (type) {
    case ACTION_TYPES.ENABLE:
      toggleRule(id);
      break;
    case ACTION_TYPES.UPDATE:
      break;
    case ACTION_TYPES.DELETE:
      rulesStore.delRule(id);
      break;
    default:
      break;
  }
  rules[id] && (rules[id].showMenu = false);
};

// 激活
function toggleRule(id: string) {
  const { rules, settings, setSysHosts } = hostsStore;
  rules[id].active = !rules[id].active;
  if (!settings.multipleSelect) {
    for (const k in rules) {
      if (rules[k].id === id) continue;
      rules[k].active = false;
    }
  }

  // 设置 hosts
  setSysHosts({
    name: rules[id].name,
    content: rules[id].content
  });
}

function showRule(id: string) {
  hostsStore.currentId = id;
}
function onContextMenu(id: string) {
  const { rules } = hostsStore;
  for (const key in rules) {
    rules[key].showMenu = false;
  }
  rules[id].showMenu = true;
}
</script>

<template>
  <h5>自定义</h5>
  <div class="sidebar-list">
    <var-menu
      v-for="{ id, name, active } in hostsStore.rules"
      :key="id"
      v-model:show="hostsStore.rules[id].showMenu"
      offset-x="100px"
      offset-y="20px"
    >
      <var-button
        text
        type="primary"
        size="large"
        @click="showRule(id)"
        @dblclick="doAction(id, ACTION_TYPES.ENABLE)"
        @contextmenu.prevent="onContextMenu(id)"
        :class="{
          'hosts-active': hostsStore.currentId === id
        }"
      >
        <!-- <var-icon v-if="active" name="checkbox-marked-circle" /> -->
        <!-- <var-icon v-if="active" name="check" /> -->
        <var-icon v-if="active" name="radio-marked" />
        <span>{{ name }}</span>
      </var-button>

      <template #menu>
        <var-cell @click="doAction(id, ACTION_TYPES.ENABLE)">应用</var-cell>
        <var-cell @click="doAction(id, ACTION_TYPES.UPDATE)">编辑</var-cell>
        <var-cell @click="doAction(id, ACTION_TYPES.DELETE)">删除</var-cell>
      </template>
    </var-menu>
  </div>
</template>

<style lang="scss">
h5 {
  margin: 10px 20px;
  color: #666;
  font-weight: 400;
}
.sidebar-list {
  .var-menu {
    width: 100%;
  }
  .var-button {
    display: block;
    width: 100%;
    text-align: left;
    .var-icon {
      position: absolute;
      font-size: 14px;
      color: #00b540;
    }
    span {
      position: relative;
      left: 20px;
    }
  }
}
</style>
