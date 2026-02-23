<script setup>
import { ref, onMounted, watch } from "vue";
import { fetchLocalities } from "../services/localityService";

const localities = ref([]);
const search = ref("");
const page = ref(1);
const next = ref(null);
const previous = ref(null);

async function load() {
  const query = `?name__icontains=${search.value}&page=${page.value}&expand=country`;
  const data = await fetchLocalities(query);

  localities.value = data.results;
  next.value = data.next;
  previous.value = data.previous;
}

onMounted(load);
watch([search, page], load);
</script>

<template>
  <div>
    <h1>Localities</h1>

    <input v-model="search" placeholder="Search locality..." />

    <ul>
      <li v-for="loc in localities" :key="loc.id">
        {{ loc.name }} — {{ loc.country?.name }}
      </li>
    </ul>

    <button :disabled="!previous" @click="page--">Previous</button>
    <button :disabled="!next" @click="page++">Next</button>
  </div>
</template>