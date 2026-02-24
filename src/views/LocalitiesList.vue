<script setup>
import { useLocalities } from "@/composables/useLocalities";

// Use composable to manage localities list, search query, pagination, loading and error states
const { localities, search, page, loading, error, next, previous } = useLocalities();
</script>

<template>
  <div>
    <h1>Localities</h1>

    <!-- Search input, bound to reactive 'search' in composable -->
    <input v-model="search" placeholder="Search locality..." />

    <!-- Display loading or error state for better UX -->
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <!-- List of localities with 'key' for efficient DOM updates -->
    <ul v-else>
      <li v-for="loc in localities" :key="loc.id">
        {{ loc.name }} — {{ loc.country?.name }}
      </li>
    </ul>

    <!-- Pagination buttons; disabled when loading or no next/previous page -->
    <button :disabled="!previous || loading" @click="page--">Previous</button>
    <button :disabled="!next || loading" @click="page++">Next</button>
  </div>
</template>