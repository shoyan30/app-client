import { createRouter, createWebHistory } from "vue-router";
import ListBranch from "@/pages/setup/ListBranch.vue";
import AddEditBranch from "@/pages/setup/AddEditBranch.vue";

const routes = [
    { path: "/setup/branch", component: ListBranch },
    { path: "/setup/branch/add", component: AddEditBranch },
    { path: "/setup/branch/edit/:id", component: AddEditBranch, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;