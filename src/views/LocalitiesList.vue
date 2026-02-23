<script setup>
import { useLocalities } from "@/composables/useLocalities";

const { localities, search, page, loading, error, next, previous } = useLocalities();
</script>

<template>
  <div>
    <h1>Localities</h1>

    <input v-model="search" placeholder="Search locality..." />

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <ul v-else>
      <li v-for="loc in localities" :key="loc.id">
        {{ loc.name }} — {{ loc.country?.name }}
      </li>
    </ul>

    <button :disabled="!previous || loading" @click="page--">Previous</button>
    <button :disabled="!next || loading" @click="page++">Next</button>
  </div>
</template>