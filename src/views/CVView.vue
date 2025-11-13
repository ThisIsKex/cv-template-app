<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import Profile from "../components/Profile.vue";
import Experience from "../components/Experience.vue";
import Education from "../components/Education.vue";
import Skills from "../components/Skills.vue";
import Projects from "../components/Projects.vue";
import ProfessionalDevelopment from "../components/ProfessionalDevelopment.vue";
import Interests from "../components/Interests.vue";
import { useCVStore } from "../stores/cvStore";

const router = useRouter();
const cvStore = useCVStore();
const isPrinting = ref(false);

onMounted(async () => {
  await cvStore.loadCVData();
});

const handlePrint = () => {
  isPrinting.value = true;
  window.print();
  setTimeout(() => {
    isPrinting.value = false;
  }, 1000);
};
</script>

<template>
  <div class="cv-app" v-if="cvStore.cvData">
    <div class="print-controls">
      <button @click="router.push('/edit');" class="edit-button">
        <font-awesome-icon icon="pen" /> Bearbeiten
      </button>
      <button @click="handlePrint" class="print-button">
        <font-awesome-icon icon="print" /> PDF/Drucken
      </button>

    </div>
    <Header :personalInfo="cvStore.cvData.personalInfo" />
    <Profile v-if="cvStore.cvData.profile" :profile="cvStore.cvData.profile" />
    <Experience :experiences="cvStore.experience" />
    <Education :education="cvStore.education" />
    <Skills :skills="cvStore.skills" />
    <Projects v-if="cvStore.projects.length > 0" :projects="cvStore.projects" />
    <ProfessionalDevelopment v-if="cvStore.cvData.professionalDevelopment.length > 0"
      :professionalDevelopment="cvStore.cvData.professionalDevelopment" />
    <Interests :interests="cvStore.cvData.interests" />

    <footer class="cv-footer">
      © 2025 {{ cvStore.cvData.personalInfo.name }} – Erstellt mit Vue 3 & TypeScript
    </footer>
  </div>
</template>

<style scoped>
.print-controls {
  text-align: center;
  padding: 20px;
  background: #f5f5f5;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.print-button {
  background-color: #0e5091;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.print-button:hover {
  background-color: #0a3a6e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 80, 145, 0.3);
}

.print-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(14, 80, 145, 0.2);
}

.edit-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-right: 12px;
}

.edit-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.edit-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(40, 167, 69, 0.2);
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  color: #0e5091;
}

.cv-app {
  min-height: 100vh;
  padding-bottom: 60px;
}

.cv-footer {
  text-align: center;
  color: #777;
  padding: 20px;
  font-size: 13px;
  margin-top: 40px;
}

@media print {
  @page {
    margin: 1.0cm 1.5cm 1.0cm 1.5cm;
    size: A4;
  }

  .print-controls {
    display: none;
  }

  .cv-footer {
    display: none;
  }
}
</style>
