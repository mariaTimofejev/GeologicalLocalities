<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { fetchLocalities } from "../services/localityService";
import L from "leaflet";

const route = useRoute();
const locality = ref(null);

onMounted(async () => {
  const data = await fetchLocalities(`${route.params.id}/?expand=country`);
  locality.value = data;

  const map = L.map("map").setView([data.latitude, data.longitude], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.marker([data.latitude, data.longitude]).addTo(map);
});
</script>

<template>
  <div v-if="locality">
    <h2>{{ locality.name }}</h2>
    <div id="map" style="height:400px"></div>
  </div>
</template>