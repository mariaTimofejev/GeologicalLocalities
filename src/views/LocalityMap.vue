<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useLocality } from "@/composables/useLocality";
import type { Locality } from "@/types/locality";
import L from "leaflet";

// Get route params to track locality ID
const route = useRoute();
const id = ref<number | string>(route.params.id as string | number);

// Update id when route changes
watch(() => route.params.id, (v) => {
  id.value = v as string | number;
});

// Fetch locality data using composable
const { locality, loading, error } = useLocality(id);

let map: L.Map | null = null;
let marker: L.Marker | null = null;

// Watch for changes in locality data
watch(locality, async (loc: Locality | null) => {
  if (!loc) return;

  await nextTick(); // Ensure DOM is updated before rendering map

// Remove previous map to prevent duplicates
  if (map) {
    map.remove();
    map = null;
  }

// Initialize Leaflet map centered on locality coordinates
  map = L.map("map").setView([loc.latitude, loc.longitude], 8);

// Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

 // Add marker with popup showing locality name
  marker = L.marker([loc.latitude, loc.longitude])
    .addTo(map)
    .bindPopup(loc.name)
    .openPopup();
});

// Cleanup map when component unmounts to free memory
onUnmounted(() => {
  if (map) map.remove();
});
</script>

<template>
  <div>

    <!-- Loading state -->
    <p v-if="loading">Loading locality...</p>

    <!-- Error state -->
    <p v-else-if="error" class="text-red-600">{{ error }}</p>

    <!-- Show map when locality data is available -->
    <div v-else-if="locality">
      <h2 class="text-xl font-semibold mb-2">{{ locality.name }}</h2>
      <p v-if="locality.country">Country: {{ locality.country?.name }}</p>
      <div id="map" style="height: 400px;" class="rounded shadow"></div>
    </div>

    <!-- Fallback if no data -->
    <p v-else>No locality data available.</p>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
}
</style>