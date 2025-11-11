<script setup lang="ts">
import type { Experience } from "../types/cv.types";

defineProps<{
  experiences: Experience[];
}>();
</script>

<template>
  <section class="cv-section">
    <h2>
      <font-awesome-icon icon="briefcase" class="section-icon" />
      Berufserfahrung
    </h2>
    <div v-for="(exp, index) in experiences" :key="index" class="experience-item">
      <div class="experience-header">
        <h3>
          <strong>{{ exp.title }}</strong> – {{ exp.company }}, {{ exp.location }}
        </h3>
        <span class="period">{{ exp.period }}</span>
      </div>
      <ul>
        <li v-for="(resp, idx) in exp.responsibilities" :key="idx">{{ resp }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cv-section {
  margin: 30px auto;
  max-width: 900px;
  background: white;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #0e5091;
  border-bottom: 2px solid #0e5091;
  padding-bottom: 6px;
  margin-bottom: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-icon {
  font-size: 18px;
}

.experience-item {
  margin-bottom: 25px;
}

.experience-item:last-child {
  margin-bottom: 0;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.experience-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: normal;
}

.period {
  color: #777;
  font-size: 14px;
  white-space: nowrap;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  margin-bottom: 6px;
}

@media print {
  .cv-section {
    box-shadow: none;
    margin: 20px auto;
    page-break-inside: avoid;
  }
}
</style>
