<script>
export default {
    props: {
        loadFunction: {
            type: Function,
            required: true
        }
    }
}
</script>

<template>
    <div class="flex justify-center items-center text-cyan-600 font-semibold">     
          <div class="w-full sm:w-1/2 md:w-1/4">
            <label for="file-input" class="flex flex-col items-center justify-center w-full h-fit hover:text-pink-500 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-opacity-30 hover:bg-opacity-100 bg-gray-50 dark:bg-opacity-30 dark:hover:bg-opacity-100 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div class="flex flex-row items-center justify-center pt-1 ">
                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400 dark:text-white font-bold mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p class="text-gray-400 dark:text-white ">
                      <span class="font-semibold hidden sm:flex text-sm sm:text-lg">ifc</span>
                    </p>
                </div>
                <input @change="loadFunction($event)" id="file-input" type="file" class="hidden" />
            </label>
        </div>        
    </div>
</template>