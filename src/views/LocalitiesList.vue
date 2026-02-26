<script setup>
import { useLocalities } from "@/composables/useLocalities";
import AppLayout from "@/components/AppLayout.vue";

// Use composable to manage localities list, search query, pagination, loading and error states
const { localities, search, page, loading, error, next, previous } = useLocalities();
</script>

<template>
  <AppLayout>
    <div class="space-y-8">

      <!-- Header -->
      <div>
        <h1 class="text-4xl font-bold text-gray-800">
          Localities
        </h1>
        <p class="text-gray-500 mt-2">
          Browse and search geological localities
        </p>
      </div>

      <!-- Search Card -->
      <div class="bg-white shadow-md rounded-2xl p-6">
        <input
          v-model="search"
          placeholder="Search locality..."
          class="w-full px-4 py-3 bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <!-- Content -->
      <div class="bg-white shadow-md rounded-2xl p-6">

        <div v-if="loading" class="text-gray-500">
          Loading...
        </div>

        <div v-else-if="error" class="text-red-500 font-medium">
          {{ error }}
        </div>

        <ul v-else class="divide-y divide-gray-100">
          <li
            v-for="loc in localities"
            :key="loc.id"
            class="py-4 flex justify-between items-center hover:bg-gray-50 px-3 rounded-lg transition"
          >
            <span class="font-medium text-gray-700">
              {{ loc.name }}
            </span>
            <span class="text-sm text-gray-400">
              {{ loc.country?.name }}
            </span>
          </li>
        </ul>

      </div>

      <!-- Pagination -->
      <div class="flex gap-4">
        <button
          :disabled="!previous || loading"
          @click="page--"
          class="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>

        <button
          :disabled="!next || loading"
          @click="page++"
          class="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-bold text-lg"
        >
          Next
        </button>
      </div>

    </div>
  </AppLayout>
</template>