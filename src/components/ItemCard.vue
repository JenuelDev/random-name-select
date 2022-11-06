<script setup lang="ts">
import defaultItemImage from "./../assets/defaultItemImage.png";
const props = defineProps(["items"]);
const emit = defineEmits(["delete", "edit"]);
</script>

<template>
    <section class="flex flex-wrap justify-center gap-5">
        <div
            v-for="(item, i) in $props.items"
            :key="item.name"
            class="square border-10px border-white flex-1 block p-1 max-w-sm bg-white rounded-lg border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex gap-5 group flex items-center relative"
            :data-order="i"
        >
            <div
                class="absolute invisible opacity-0 -right-3 -top-0 group-hover:visible group-hover:opacity-100 group-hover:-top-3 transition-all flex gap-5px select-none"
            >
                <div
                    class="bg-yellow-600 px-2 text-light-50 rounded-md cursor-pointer hover:bg-yellow-700"
                    @click="
                        $emit('edit', {
                            index: i,
                            data: item,
                        })
                    "
                >
                    Edit
                </div>
                <div
                    class="bg-red-600 px-2 text-light-50 rounded-md cursor-pointer hover:bg-red-800"
                    @click="
                        $emit('delete', {
                            index: i,
                            data: item,
                        })
                    "
                >
                    Del
                </div>
            </div>
            <div class="w-70px h-70px rounded-10px overflow-hidden flex items-center justify-center relative">
                <img
                    :src="item.img ? item.img : defaultItemImage"
                    class="absolute h-70px transform scale-100 rotate-0 group-hover:rotate-45 group-hover:scale-135 transition-all"
                />
            </div>
            <div class="flex flex-col justify-between">
                <div>
                    <div class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white max-w-150px truncate">
                        {{ item.name }}
                    </div>
                    <div class="flex">
                        <div
                            class="bg-orange-600 text-size-20px rounded-md text-light-50 px-2 pb-1 font-600 whitespace-nowrap"
                        >
                            {{ item.nickName }}
                        </div>
                    </div>
                </div>
                <div class="uppercase whitespace-nowrap">
                    {{ item.selectedType ? item.selectedType.split("_").join(" ") : "" }}
                </div>
            </div>
        </div>
    </section>
</template>
