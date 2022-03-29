<template>
  <div class="table-responsive">
    <table>
      <thead>
        <tr>
          <th>Moeda</th>
          <th>Nome</th>
          <th>Máximo</th>
          <th>Mínimo</th>
          <th>Variação</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(quote, key) in props.quotes" :key="key">
          <td>{{ key }}</td>
          <td>{{ quote.name }}</td>
          <td>{{ quote.high }}</td>
          <td>{{ quote.low }}</td>
          <td>
            <span
              class="label label-rounded text-small"
              :class="{
                'label-error': quotes.pctChange < 0,
                'label-success': quote.pctChange > 0,
              }"
            >
              {{ quote.pctChange }} %
            </span>
          </td>
          <td>
            <a
              v-if="!listenQuotes.includes(key)"
              class="btn btn-primary btn-sm tooltip tooltip-left"
              data-tooltip="Seguir"
              @click="$emit('listen', key)"
            >
              <i class="icon icon-plus"></i>
            </a>
            <a
              v-else
              class="btn btn-error btn-sm tooltip tooltip-left"
              data-tooltip="Remover"
              @click="$emit('unlisten', key)"
            >
              <i class="icon icon-minus"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  quotes: {
    type: Object,
    required: true,
  },
  listenQuotes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["listen", "unlisten"]);
</script>

<style scoped>
  .table-responsive {
      min-height: .01%;
      overflow-x: auto;
      
  }
  table {
    width: 100%;
  }
  

 
    

</style>