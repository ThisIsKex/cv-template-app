import { createRouter, createWebHistory } from "vue-router";
import CVView from "../views/CVView.vue";
import EditorView from "../views/EditorView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "cv",
      component: CVView,
    },
    {
      path: "/edit",
      name: "editor",
      component: EditorView,
    },
  ],
});

export default router;
