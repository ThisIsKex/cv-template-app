import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CVData } from "../types/cv.types";

export const useCVStore = defineStore("cv", () => {
  // State
  const cvData = ref<CVData | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  // Actions
  async function loadCVData() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch("/cv-data.json");
      if (response.ok) {
        const jsonData = await response.json();
        cvData.value = jsonData;
        console.log("✅ CV-Daten aus cv-data.json geladen");
      } else {
        console.log("ℹ️ Keine cv-data.json gefunden, nutze Standard-Daten");
        // Hier könnten Standard-Daten gesetzt werden
      }
    } catch (err) {
      console.log("ℹ️ Keine cv-data.json gefunden, nutze Standard-Daten");
      error.value = err instanceof Error ? err.message : "Unbekannter Fehler";
    } finally {
      isLoading.value = false;
    }
  }

  function updateCVData(newData: CVData) {
    cvData.value = newData;
  }

  function resetCVData() {
    cvData.value = null;
    error.value = null;
  }

  // Getters (computed)
  const hasData = computed(() => cvData.value !== null);
  const personalInfo = computed(() => cvData.value?.personalInfo);
  const experience = computed(() => cvData.value?.experience || []);
  const education = computed(() => cvData.value?.education || []);
  const skills = computed(() => cvData.value?.skills || []);
  const projects = computed(() => cvData.value?.projects || []);

  return {
    // State
    cvData,
    isLoading,
    error,

    // Getters
    hasData,
    personalInfo,
    experience,
    education,
    skills,
    projects,

    // Actions
    loadCVData,
    updateCVData,
    resetCVData,
  };
});
