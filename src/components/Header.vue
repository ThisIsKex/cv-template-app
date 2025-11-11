<script setup lang="ts">
import type { PersonalInfo } from "../types/cv.types";

defineProps<{
  personalInfo: PersonalInfo;
}>();
</script>

<template>
  <header class="cv-header">
    <div class="header-content">
      <img
        v-if="personalInfo.profileImage"
        :src="personalInfo.profileImage"
        :alt="personalInfo.name"
        class="profile-image"
      />
      <div class="header-text">
        <h1>{{ personalInfo.name }}</h1>
        <p class="contact-info">
          <span>
            <font-awesome-icon icon="map-marker-alt" />
            {{ personalInfo.location }}
          </span>
          <span>
            <font-awesome-icon icon="phone" />
            {{ personalInfo.phone }}
          </span>
          <span>
            <font-awesome-icon icon="envelope" />
            {{ personalInfo.email }}
          </span>
        </p>
        <p class="social-links" v-if="personalInfo.github || personalInfo.linkedin">
          <a v-if="personalInfo.github" :href="personalInfo.github" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" />
            {{ personalInfo.github.replace("https://", "").replace("github.com/", "") }}
          </a>
          <span v-if="personalInfo.github && personalInfo.linkedin">|</span>
          <a v-if="personalInfo.linkedin" :href="personalInfo.linkedin" target="_blank">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
            {{ personalInfo.linkedin.replace("https://", "").replace("linkedin.com/in/", "") }}
          </a>
        </p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cv-header {
  background-color: #0e5091;
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.header-text {
  text-align: left;
}

.cv-header h1 {
  margin: 0 0 10px 0;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 2.5rem;
}

.contact-info {
  margin: 10px 0;
  font-size: 14px;
}

.contact-info span {
  margin: 0 15px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.social-links {
  margin: 10px 0 0 0;
  font-size: 14px;
}

.social-links a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.social-links a:hover {
  text-decoration: underline;
}

@media print {
  .cv-header {
    background-color: #0e5091 !important;
    color: white !important;
    padding: 30px 1.5cm;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    margin: 0 !important;
    width: 100% !important;
    box-sizing: border-box;
  }

  .profile-image {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .social-links a {
    color: white !important;
  }

  .contact-info,
  .social-links {
    color: white !important;
  }
}

@media (max-width: 600px) {
  .header-content {
    flex-direction: column;
  }

  .header-text {
    text-align: center;
  }
}
</style>
