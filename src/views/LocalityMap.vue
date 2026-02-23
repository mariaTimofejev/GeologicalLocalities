<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useLocality } from "@/composables/useLocality";
import type { Locality } from "@/types/locality";
import L from "leaflet";

const route = useRoute();
const id = ref<number | string>(route.params.id as string | number);

// Kui route param muutub, uuendame id
watch(() => route.params.id, (v) => {
  id.value = v as string | number;
});

// Kasutame composable’i
const { locality, loading, error } = useLocality(id);

let map: L.Map | null = null;
let marker: L.Marker | null = null;

// Watch locality muutumist
watch(locality, async (loc: Locality | null) => {
  if (!loc) return;

  await nextTick();

  // Eemalda eelmine kaart
  if (map) {
    map.remove();
    map = null;
  }

  // Loo uus kaart
  map = L.map("map").setView([loc.latitude, loc.longitude], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  marker = L.marker([loc.latitude, loc.longitude])
    .addTo(map)
    .bindPopup(loc.name)
    .openPopup();
});

// Cleanup kaardi eemaldamiseks komponendi unmountimisel
onUnmounted(() => {
  if (map) map.remove();
});
</script>

<template>
  <div>
    <p v-if="loading">Loading locality...</p>
    <p v-else-if="error" class="text-red-600">{{ error }}</p>

    <div v-else-if="locality">
      <h2 class="text-xl font-semibold mb-2">{{ locality.name }}</h2>
      <p v-if="locality.country">Country: {{ locality.country?.name }}</p>
      <div id="map" style="height: 400px;" class="rounded shadow"></div>
    </div>

    <p v-else>No locality data available.</p>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
}
</style>