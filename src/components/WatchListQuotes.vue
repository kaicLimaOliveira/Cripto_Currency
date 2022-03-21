<template>
  <ListQuotes
    :quotes="quotes"
    :listenQuotes="props.listenQuotes"
    @unlisten="onUnlisten"
  />
  <div class="mt-2 text-right">
    <cite class="text-small">
      Atualizará novamente em <b>{{ nextUpdatedTime }} segundos</b>
    </cite>
  </div>
</template>

<script lang="ts" setup>
import ListQuotes from "./ListQuotes.vue";
import {
  ref,
  defineProps,
  defineEmits,
  watch,
  onMounted,
  reactive,
  onUnmounted,
} from "vue";
import api from "@/services/api";

const CURRENT_UPDATE_TIME = 10;

const props = defineProps({
  listenQuotes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["unlisten"]);

const quotes = ref({});
const nextUpdatedTime = ref(CURRENT_UPDATE_TIME);
const interval = ref();
const methods = reactive({
  async refresh() {
    const { data } = await api.listen(props.listenQuotes);
    quotes.value = data;
  },

  restartInterval() {
    clearInterval(interval.value);
    nextUpdatedTime.value = CURRENT_UPDATE_TIME;
    interval.value = setInterval(() => {
      nextUpdatedTime.value--;

      if (nextUpdatedTime.value === 0) {
        nextUpdatedTime.value = CURRENT_UPDATE_TIME;
        this.refresh();
      }
    }, 1000);
  },
});

onMounted(() => {
  methods.refresh();
  methods.restartInterval();
});

onUnmounted(() => {
  clearInterval(interval.value);
});

watch(props, () => {
  methods.refresh();
  methods.restartInterval();
});

function onUnlisten(code: string) {
  emit("unlisten", code);
}
</script>