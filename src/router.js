import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        meta: {
            title: "IfcARViewer"
        },
        path: "/",
        name: "IfcARViewer",
        component: () => import('./views/Home.vue'),
    },
    {
        meta: {
            title: "Ifc AR"
        },
        path: "/ifcAR",
        name: "IfcAR",
        component: () => import('./views/IfcAR.vue'),
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }
    }
});

export default router;
