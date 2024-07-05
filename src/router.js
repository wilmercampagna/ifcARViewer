import { createRouter, createWebHashHistory } from "vue-router";
import IfcAR from './views/IfcAR.vue';

const routes = [
    {
        meta: {
            title: "IfcARViewer"
        },
        path: "/",
        name: "IfcARViewer",
        component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue')
        // component: HomeView,
    },
    {
        meta: {
            title: "Ifc AR"
        },
        path: "/ifcAR",
        name: "IfcAR",
        component: IfcAR,
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
