<script setup lang="ts">
import { ref } from 'vue';
import { useHostsStore } from '@/stores/hosts';

defineProps(['show']);
defineEmits(['updates:show']);

const { settings } = useHostsStore();
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
        <var-switch v-model="settings.multipleSelect" />
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
