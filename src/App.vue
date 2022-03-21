<template>
  <div class="container grid-lg my-2 py-2">
    <div class="card mb-2" v-if="data.listenQuotes.length > 0">
      <div class="card-header">
        <div class="h4">Acompahando</div>
      </div>
      <div class="card-body">
        <WatchListQuotes
          :listenQuotes="data.listenQuotes"
          @unlisten="onUnlisten"
        />
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="h4">Todas as moedas</div>
      </div>
      <div class="card-body">
        <ListQuotes
          :quotes="data.quotes"
          :listenQuotes="data.listenQuotes"
          @listen="onListen"
          @unlisten="onUnlisten"
        />
      </div>
    </div>
  </div>
</template>

<script async setup lang="ts">
import { reactive, onMounted } from "vue";
import api from "@/services/api";
import ListQuotes from "@/components/ListQuotes.vue";
import WatchListQuotes from "@/components/WatchListQuotes.vue";

const data = reactive({
  quotes: {},
  listenQuotes: [],
});

onMounted(async () => {
  const response = await api.all();
  data.quotes = response.data;
});


function onListen(code: string) {
  data.listenQuotes.push(code);
}

function onUnlisten(code: string) {
  data.listenQuotes = data.listenQuotes.filter((key) => key !== code);
}
</script>

