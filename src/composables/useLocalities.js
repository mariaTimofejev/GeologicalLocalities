import { ref, watch } from "vue";
import { fetchLocalities } from "@/services/localityService";

export function useLocalities() {

  const localities = ref([]);
  const search = ref("");
  const page = ref(1);
  const limit = 10;
  const loading = ref(false);
  const error = ref(null);

  const next = ref(null);
  const previous = ref(null);

  let controller;

  async function load() {
    try {
      loading.value = true;
      error.value = null;
      controller?.abort();
      controller = new AbortController();

      // compute offset from current page – always up to date
      const offsetValue = (page.value - 1) * limit;

      // build options object for service
      const options = {
        name__icontains: search.value || undefined,
        limit,
        offset: offsetValue,
        expand: "country",
      };

      const data = await fetchLocalities(options, controller.signal);

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

  // search reset → page 1
  watch(search, () => page.value = 1);

  // debounce load
  let timeout;
  watch([search, page], () => {
    clearTimeout(timeout);
    timeout = setTimeout(load, 400);
  });

  return { localities, search, page, loading, error, next, previous };
}