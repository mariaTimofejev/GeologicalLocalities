import { ref, watch } from "vue";
import { fetchLocalities } from "@/services/localityService";

export function useLocality(id) {
  const locality = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function load() {
    try {
      loading.value = true;
      error.value = null;

      const data = await fetchLocalities(`${id.value}/?expand=country`);
      locality.value = data;

    } catch {
      error.value = "Failed to load locality";
    } finally {
      loading.value = false;
    }
  }

  watch(id, load, { immediate: true });

  return { locality, loading, error };
}