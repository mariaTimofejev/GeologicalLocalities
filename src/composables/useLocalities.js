import { ref, watch } from "vue";
import { fetchLocalities } from "@/services/localityService";

export function useLocalities() {
  const localities = ref([]);
  const search = ref("");
  const page = ref(1);
  const loading = ref(false);
  const error = ref(null);
  const next = ref(null);
  const previous = ref(null);

  let controller;

  async function load() {
    try {
      loading.value = true;
      error.value = null;

      // cancel previous request
      controller?.abort();
      controller = new AbortController();

      const query = `?name__icontains=${search.value}&page=${page.value}&expand=country`;
      const data = await fetchLocalities(query, controller.signal);

      localities.value = data.results;
      next.value = data.next;
      previous.value = data.previous;

    } catch (e) {
      if (e.name !== "AbortError") {
        error.value = "Failed to load localities";
      }
    } finally {
      loading.value = false;
    }
  }

  // reset page when searching
  watch(search, () => page.value = 1);

  // debounce search
  let timeout;
  watch([search, page], () => {
    clearTimeout(timeout);
    timeout = setTimeout(load, 400);
  });

  return { localities, search, page, loading, error, next, previous };
}