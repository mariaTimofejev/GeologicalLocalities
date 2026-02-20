<script setup>
import { ref, onMounted, watch, computed } from "vue"

const localities = ref([])
const loading = ref(false)
const search = ref("")

const filteredLocalities = computed(() => {
  if (!search.value) return localities.value

  return localities.value.filter(loc =>
    (loc.name || loc.name_en || "")
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
})
// -------- FETCH FUNCTION ----------
async function fetchLocalities(query = "") {
  loading.value = true
  try {
    let url =
      "https://rwapi.geoloogia.info/api/v1/public/localities/?expand=country"

    // SERVER-SIDE SEARCH
    if (query) {
      url += `&name__icontains=${encodeURIComponent(query)}`
    }

    const res = await fetch(url)
    const data = await res.json()

    // API returns { results: [...] }
    localities.value = data.results || data
  } catch (e) {
    console.error("API error:", e)
  } finally {
    loading.value = false
  }
}

// first load
onMounted(() => {
  fetchLocalities()
})


// --- AUTOMATIC SERVER SEARCH (debounced) ---
let timeout = null
watch(search, (val) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    fetchLocalities(val)
  }, 400)
})

onMounted(() => {
  console.log("mounted")
  fetchLocalities()
})
</script>

<template>
  <div class="container">
    <h1>Localities</h1>

    <!-- SEARCH -->
    <input
      v-model="search"
      type="text"
      placeholder="Search locality..."
      class="search"
    />

    <p v-if="loading">Loading...</p>

    <!-- LIST -->
    <ul v-else>
      <li v-for="loc in filteredLocalities" :key="loc.id" class="item">
        <strong>{{ loc.name || loc.name_en }}</strong><br>
        ID: {{ loc.id }}<br>

        <span v-if="loc.country">
          Country: {{ loc.country.name_en || loc.country.name }}
        </span>
        <span v-else>
          Country: —
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  font-family: Arial;
}

.search {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  font-size: 16px;
}

.item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
</style>