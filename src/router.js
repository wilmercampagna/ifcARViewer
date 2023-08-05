import { createRouter, createWebHashHistory } from "vue-router";
import IfcAR from './views/IfcAR.vue';
import IfcVR from './views/IfcVR.vue';
import IfcGame from './views/IfcGame.vue';

const routes = [
    {
        meta: {
            title: "Ifc4All"
        },
        path: "/",
        name: "Ifc4All",
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
    },
    {
        meta: {
            title: "ifc VR"
        },
        path: "/ifcVR",
        name: "VR",
        component: IfcVR,
    },
    {
        meta: {
            title: "ifc Game"
        },
        path: "/ifcGame",
        name: "Game",
        component: IfcGame,
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
