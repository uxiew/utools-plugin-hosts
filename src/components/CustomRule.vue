<script setup lang="ts">
import { SYSTEM_ID } from '@/common/config';
import { saveToDB } from '@/common/utils';
import { useHostsStore } from '@/stores/hosts';
import { useRulesStore } from '@/stores/rules';
import { computed, ref, watch } from 'vue';

const rulesStore = useRulesStore();
const hostsStore = useHostsStore();
const { rules, settings, setSysHosts } = hostsStore;

const iconName = ref('check');

watch(
  () => settings.multiSelect,
  (val: boolean) => {
    iconName.value = val ? 'check' : 'radio-marked';
  },
  { immediate: true }
);

const AllRules = computed(() =>
  Object.values(hostsStore.rules).sort((v1, v2) => v1.order - v2.order)
);

const ACTION_TYPES = {
  ENABLE: 0,
  UPDATE: 1,
  DELETE: 2
};

const doAction = (id: string, type: number) => {
  switch (type) {
    case ACTION_TYPES.ENABLE:
      {
        toggleRule(id);
        setSysHosts();
      }
      break;
    case ACTION_TYPES.UPDATE:
      {
        hostsStore.updating = id;
      }
      break;
    case ACTION_TYPES.DELETE:
      {
        rulesStore.delRule(id);
        hostsStore.currentId = SYSTEM_ID;
        setSysHosts();
      }
      break;
    default:
      break;
  }
  rules[id] && (rules[id].showMenu = false);
};

// 激活
function toggleRule(id: string) {
  const active = rules[id].active;
  if (!settings.multiSelect) {
    for (const k in rules) {
      if (rules[k].id === id) {
        rules[id].active = !active;
        saveToDB(id, { active: !active });
        continue;
      }
      rules[k].active = active && rules[k].active ? true : false;
    }
  } else {
    rules[id].active = !active;
    saveToDB(id, { active: !active });
  }
}

function showRule(id: string) {
  hostsStore.currentId = id;
}
function onContextMenu(id: string) {
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
      v-for="{ id, name, active } in AllRules"
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
        <var-icon v-if="active" :name="iconName" />
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
