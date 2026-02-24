import { ref, watch } from "vue";
import { fetchLocalities } from "@/services/localityService";

export function useLocality(id) {

// reactive state for component UI
  const locality = ref(null);
  const loading = ref(false);
  const error = ref(null);

// fetch locality data from API
  async function load() {
    try {
      loading.value = true;
      error.value = null;

// expand=country avoids extra request (backend relation preload)
      const data = await fetchLocalities(`${id.value}/?expand=country`);
      locality.value = data;

    } catch {

// user-friendly error instead of raw API error
      error.value = "Failed to load locality";
    } finally {

// always stop loader (success or fail)
      loading.value = false;
    }
  }

// automatically refetch when route id changes
  watch(id, load, { immediate: true });

// exposed composable state
  return { locality, loading, error };
}