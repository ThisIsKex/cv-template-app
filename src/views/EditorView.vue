<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCVStore } from "../stores/cvStore";
import type { CVData } from "../types/cv.types";

const router = useRouter();
const cvStore = useCVStore();
const formData = ref<CVData>(null!);

onMounted(async () => {
  await cvStore.loadCVData();
  if (cvStore.cvData) {
    formData.value = cvStore.cvData;
  }
});

const downloadJSON = () => {
  const dataStr = JSON.stringify(formData.value, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cv-data.json";
  link.click();
  URL.revokeObjectURL(url);
  alert("JSON wurde heruntergeladen! Legen Sie die Datei im public/ Ordner ab.");
};

const uploadJSON = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        formData.value = data;
        alert("Daten erfolgreich importiert!");
      } catch (error) {
        alert("Fehler beim Import: Ungültiges JSON Format");
      }
    };
    reader.readAsText(file);
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem("cvData", JSON.stringify(formData.value));
  alert("Daten im Browser gespeichert!");
};

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem("cvData");
  if (saved) {
    formData.value = JSON.parse(saved);
    alert("Daten aus dem Browser geladen!");
  } else {
    alert("Keine gespeicherten Daten gefunden.");
  }
};

const addExperience = () => {
  formData.value.experience.push({
    title: "",
    company: "",
    location: "",
    period: "",
    responsibilities: [""],
  });
};

const removeExperience = (index: number) => {
  formData.value.experience.splice(index, 1);
};

const addResponsibility = (expIndex: number) => {
  formData.value.experience[expIndex].responsibilities.push("");
};

const removeResponsibility = (expIndex: number, respIndex: number) => {
  formData.value.experience[expIndex].responsibilities.splice(respIndex, 1);
};

const addEducation = () => {
  formData.value.education.push({
    degree: "",
    institution: "",
    period: "",
  });
};

const removeEducation = (index: number) => {
  formData.value.education.splice(index, 1);
};

const addSkill = () => {
  formData.value.skills.push("");
};

const removeSkill = (index: number) => {
  formData.value.skills.splice(index, 1);
};

const addProject = () => {
  formData.value.projects.push({
    name: "",
    description: "",
    icon: "",
  });
};

const removeProject = (index: number) => {
  formData.value.projects.splice(index, 1);
};
</script>

<template>
  <div class="editor-view" v-if="formData">
    <header class="editor-header">
      <h1>CV Editor</h1>
      <div class="header-actions">
        <button @click="router.push('/')" class="btn btn-secondary">
          <font-awesome-icon icon="arrow-left" /> Zurück zum CV
        </button>
        <button @click="saveToLocalStorage" class="btn btn-primary">
          <font-awesome-icon icon="save" /> Speichern
        </button>
        <button @click="loadFromLocalStorage" class="btn btn-secondary">
          <font-awesome-icon icon="upload" /> Laden
        </button>
        <button @click="downloadJSON" class="btn btn-success">
          <font-awesome-icon icon="download" /> JSON Export
        </button>
        <label class="btn btn-info">
          <font-awesome-icon icon="file-import" /> JSON Import
          <input type="file" accept=".json" @change="uploadJSON" style="display: none" />
        </label>
      </div>
    </header>

    <div class="editor-container">
      <!-- Personal Info -->
      <section class="editor-section">
        <h2><font-awesome-icon icon="user" /> Persönliche Informationen</h2>
        <div class="form-grid">
          <div class="form-group">
            <label>Name</label>
            <input v-model="formData.personalInfo.name" type="text" />
          </div>
          <div class="form-group">
            <label>Ort</label>
            <input v-model="formData.personalInfo.location" type="text" />
          </div>
          <div class="form-group">
            <label>Telefon</label>
            <input v-model="formData.personalInfo.phone" type="text" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="formData.personalInfo.email" type="email" />
          </div>
          <div class="form-group">
            <label>GitHub URL</label>
            <input v-model="formData.personalInfo.github" type="url" />
          </div>
          <div class="form-group">
            <label>LinkedIn URL</label>
            <input v-model="formData.personalInfo.linkedin" type="url" />
          </div>
          <div class="form-group full-width">
            <label>Profilbild URL</label>
            <input v-model="formData.personalInfo.profileImage" type="url" />
          </div>
        </div>
      </section>

      <!-- Profile -->
      <section class="editor-section">
        <h2><font-awesome-icon icon="lightbulb" /> Profil</h2>
        <div class="form-group">
          <textarea v-model="formData.profile" rows="4"></textarea>
        </div>
      </section>

      <!-- Experience -->
      <section class="editor-section">
        <h2><font-awesome-icon icon="briefcase" /> Berufserfahrung</h2>
        <div v-for="(exp, expIndex) in formData.experience" :key="expIndex" class="subsection">
          <div class="subsection-header">
            <h3>Position {{ expIndex + 1 }}</h3>
            <button @click="removeExperience(expIndex)" class="btn btn-danger btn-sm">
              <font-awesome-icon icon="trash" /> Entfernen
            </button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Position</label>
              <input v-model="exp.title" type="text" />
            </div>
            <div class="form-group">
              <label>Unternehmen</label>
              <input v-model="exp.company" type="text" />
            </div>
            <div class="form-group">
              <label>Ort</label>
              <input v-model="exp.location" type="text" />
            </div>
            <div class="form-group">
              <label>Zeitraum</label>
              <input v-model="exp.period" type="text" placeholder="z.B. 03/2021 – heute" />
            </div>
          </div>
          <div class="form-group">
            <label>Verantwortlichkeiten</label>
            <div v-for="(_, respIndex) in exp.responsibilities" :key="respIndex" class="list-item">
              <input v-model="exp.responsibilities[respIndex]" type="text" />
              <button
                @click="removeResponsibility(expIndex, respIndex)"
                class="btn btn-danger btn-xs"
              >
                <font-awesome-icon icon="times" />
              </button>
            </div>
            <button @click="addResponsibility(expIndex)" class="btn btn-secondary btn-sm">
              <font-awesome-icon icon="plus" /> Verantwortlichkeit hinzufügen
            </button>
          </div>
        </div>
        <button @click="addExperience" class="btn btn-primary">
          <font-awesome-icon icon="plus" /> Position hinzufügen
        </button>
      </section>

      <!-- Education -->
      <section class="editor-section">
        <h2><font-awesome-icon icon="graduation-cap" /> Ausbildung</h2>
        <div v-for="(edu, eduIndex) in formData.education" :key="eduIndex" class="subsection">
          <div class="subsection-header">
            <h3>Ausbildung {{ eduIndex + 1 }}</h3>
            <button @click="removeEducation(eduIndex)" class="btn btn-danger btn-sm">
              <font-awesome-icon icon="trash" /> Entfernen
            </button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Abschluss</label>
              <input v-model="edu.degree" type="text" />
            </div>
            <div class="form-group">
              <label>Institution</label>
              <input v-model="edu.institution" type="text" />
            </div>
            <div class="form-group">
              <label>Zeitraum</label>
              <input v-model="edu.period" type="text" placeholder="z.B. 10/2014 – 09/2018" />
            </div>
          </div>
        </div>
        <button @click="addEducation" class="btn btn-primary">
          <font-awesome-icon icon="plus" /> Ausbildung hinzufügen
        </button>
      </section>

      <!-- Skills -->
      <section class="editor-section">
        <h2><font-awesome-icon icon="code" /> Kenntnisse</h2>
        <div class="skills-list">
          <div v-for="(_, skillIndex) in formData.skills" :key="skillIndex" class="list-item">
            <input v-model="formData.skills[skillIndex]" type="text" />
            <button @click="removeSkill(skillIndex)" class="btn btn-danger btn-xs">
              <font-awesome-icon icon="times" />
            </button>
          </div>
        </div>
        <button @click="addSkill" class="btn btn-primary">
          <font-awesome-icon icon="plus" /> Kenntnis hinzufügen
        </button>
      </section>

      <!-- Projects -->
      <section class="editor-section">
        <h2><font-awesome-icon icon="lightbulb" /> Projekte</h2>
        <div v-for="(project, projIndex) in formData.projects" :key="projIndex" class="subsection">
          <div class="subsection-header">
            <h3>Projekt {{ projIndex + 1 }}</h3>
            <button @click="removeProject(projIndex)" class="btn btn-danger btn-sm">
              <font-awesome-icon icon="trash" /> Entfernen
            </button>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Name</label>
              <input v-model="project.name" type="text" />
            </div>
            <div class="form-group">
              <label>Icon (Emoji)</label>
              <input v-model="project.icon" type="text" placeholder="z.B. 💡" />
            </div>
            <div class="form-group full-width">
              <label>Beschreibung</label>
              <textarea v-model="project.description" rows="2"></textarea>
            </div>
          </div>
        </div>
        <button @click="addProject" class="btn btn-primary">
          <font-awesome-icon icon="plus" /> Projekt hinzufügen
        </button>
      </section>

      <!-- Interests -->
      <section class="editor-section">
        <h2><font-awesome-icon icon="heart" /> Interessen</h2>
        <div class="form-group">
          <textarea v-model="formData.interests" rows="2"></textarea>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.editor-view {
  min-height: 100vh;
  background: #f5f5f5;
}

.editor-header {
  background: #136c96;
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.editor-header h1 {
  margin: 0;
  font-size: 1.8rem;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.editor-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.editor-section {
  background: white;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.editor-section h2 {
  color: #0e5091;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0e5091;
}

.subsection {
  background: #f9f9f9;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.subsection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.subsection-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #555;
}

.list-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.list-item input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.skills-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
}

/* Buttons */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: #0e5091;
  color: white;
}

.btn-primary:hover {
  background: #0c4279;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #138496;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.85rem;
}

.btn-xs {
  padding: 4px 8px;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .editor-header {
    flex-direction: column;
    gap: 15px;
  }

  .header-actions {
    flex-wrap: wrap;
    justify-content: center;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
