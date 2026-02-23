<script setup>
import { ref, watch, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useLocality } from "@/composables/useLocality";
import L from "leaflet";

const route = useRoute();
const id = ref(route.params.id);

watch(() => route.params.id, v => id.value = v);

const { locality, loading, error } = useLocality(id);

let map = null;
let marker = null;

watch(locality, async (loc) => {
  if (!loc) return;

  await nextTick();

  // destroy previous map
  if (map) {
    map.remove();
    map = null;
  }

  map = L.map("map").setView([loc.latitude, loc.longitude], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(map);

  marker = L.marker([loc.latitude, loc.longitude]).addTo(map);
});

onUnmounted(() => {
  if (map) map.remove();
});
</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else-if="locality">
      <h2>{{ locality.name }}</h2>
      <div id="map" style="height:400px"></div>
    </div>
  </div>
</template>