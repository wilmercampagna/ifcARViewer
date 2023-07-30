<script></script>

<template>
    <div class="mx-auto space-x-20 flex w-full items-center justify-center bg-transparent">
        <div class="group relative cursor-pointer">
            <div class="flex items-center justify-between space-x-5 bg-transparent px-2 dark:text-white">
                <a class="menu-hover hidden sm:flex text-base font-medium text-blue-800 dark:text-white" onClick="">
                    XR
                </a>
                <mdicon class="dark:text-blue-500 text-blue-800" name="cube-scan"/>                
            </div>
            <div class="invisible absolute dark:bg-transparent z-50 flex w-36 flex-col bg-gray-100 py-1 px-4 text-gray-500 shadow-xl group-hover:visible"
                onClick="">
                <router-link to="/ifcVR" class="flex space-x-10 flex-row my-1 block border-b border-gray-100 py-1 font-semibold dark:text-white dark:hover:text-cyan-400 hover:text-purple-900 md:mx-2">
                    <mdicon class="" name="virtual-reality"/>Ifc VR
                </router-link>
                <router-link to="/ifcAR" class="flex space-x-10 flex-row my-1 block border-b border-gray-100 py-1 font-semibold  dark:text-white dark:hover:text-cyan-400 hover:text-purple-900 md:mx-2">
                    <mdicon class="" name="augmented-reality"/>Ifc AR
                </router-link>
                <router-link to="/ifcGame" class="flex space-x-10 flex-row my-1 block border-b border-gray-100 py-1 font-semibold  dark:text-white dark:hover:text-cyan-400 hover:text-purple-900 md:mx-2">
                    <mdicon class="" name="controller"/>Ifc Game
                </router-link>
                
            </div>
        </div>
    </div>
</template>
