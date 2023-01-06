<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useHostsStore } from '@/stores/hosts';
import { saveToDB } from '@/common/utils';
import { SETTING_ID } from '@/common/config';

defineProps(['show']);
defineEmits(['updates:show']);

const hostsStore = useHostsStore();
const settings = reactive(hostsStore.settings);

watch(settings, (sets) => {
  for (const k in sets) {
    // @ts-ignore
    hostsStore.settings[k] = sets[k];
  }
  saveToDB(SETTING_ID, sets);
});
</script>

<template>
  <div class="sidebar-settings">
    <var-dialog
      title=""
      v-model:show="show"
      @closed="$emit('update:show', false)"
      :confirm-button="false"
      :cancel-button="false"
      :overlayStyle="{ backgroundColor: 'transparent', borderRadius: '20px' }"
      messageAlign="right"
    >
      <var-cell>
        允许选择多个方案
        <var-switch v-model="settings.multiSelect" />
      </var-cell>
    </var-dialog>
  </div>
</template>

<style lang="scss">
.sidebar {
  &-settings {
    height: 40px;

    .var-dialog__popup {
      width: 220px !important;
      position: absolute;
      bottom: 60px;
      left: 66px;
    }
    .var-dialog {
      width: auto;
    }
    .var-cell {
      padding: 0 0 10px;
    }
    .var-switch {
      margin-left: 10px;
    }
  }
}
</style>
