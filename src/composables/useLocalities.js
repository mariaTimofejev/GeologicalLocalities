import { ref, watch } from "vue";
import { fetchLocalities } from "@/services/localityService";

export function useLocalities() {

// reactive state used by UI
  const localities = ref([]);
  const search = ref("");
  const page = ref(1);
  const loading = ref(false);
  const error = ref(null);

// API pagination links (DRF style API)
  const next = ref(null);
  const previous = ref(null);

// used to cancel previous API request when user types fast
  let controller;

  async function load() {
    try {
      loading.value = true;
      error.value = null;

// cancel previous request to avoid race conditions
      controller?.abort();
      controller = new AbortController();

// backend filtering + pagination
      const query = `?name__icontains=${search.value}&page=${page.value}&expand=country`;
      const data = await fetchLocalities(query, controller.signal);

 // update UI state
      localities.value = data.results;
      next.value = data.next;
      previous.value = data.previous;

    } catch (e) {
        
// ignore abort errors (user typed again)
      if (e.name !== "AbortError") {
        error.value = "Failed to load localities";
      }
    } finally {
      loading.value = false;
    }
  }

// whenever search changes → go back to first page
  watch(search, () => page.value = 1);

// debounce prevents API spam while typing
  let timeout;
  watch([search, page], () => {
    clearTimeout(timeout);
    timeout = setTimeout(load, 400);
  });

  return { localities, search, page, loading, error, next, previous };
}