<script lang="ts" setup>
import Swal from "sweetalert2";
import { Storage } from "storage-container-js";
import AddItem from "./components/AddNewItems.vue";
import { onMounted, ref } from "vue";
import ItemCard from "./components/ItemCard.vue";
import TokSound from "./assets/soundeffects/tok.mp3";
import WinSound from "./assets/soundeffects/piglevelwin.mp3";
import RainParticles from "./components/RainParticles.vue";
import confetti from "canvas-confetti";

type ItemInterface = { name: string; nickName: string; img: string; selectedType: string };
const itemStorageKey = "random-selector-items";
const itemsSelectedStorageKey = "item-selected-items";
const itemDoneSelectedStorageKey = "item-done-selected-items";
const items = ref<Array<ItemInterface>>([]);
const selectedItems = ref<Array<ItemInterface>>([]); // contains array of index selected
const doneSelectedItems = ref<Array<ItemInterface>>([]);
const addingItemComponentRef = ref<null | { toggleEdit: Function }>(null);
const isLoading = ref(false);
const isSelectTriggered = ref(false);
const isInSelectedItems = ref(false);
const winnerDataToDisplay = ref<null | { name: string; nickName: string }>(null);
const showStoreModal = ref(false);

const minimum_jumps = 30;
let current_index = -1;
let jumps = 0;
let speed = 30;
let timer: any = 0;
let prize = -1;

function runCircle() {
    const tokSound = new Audio(TokSound);
    tokSound.playbackRate = 2;
    tokSound.play();
    document.querySelector(`[data-order="${current_index}"]`)?.classList.remove("is-active");
    current_index += 1;

    if (current_index > items.value.length - 1) current_index = 0;
    document.querySelector(`[data-order="${current_index}"]`)?.classList.add("is-active");
}

function generatePrizeNumber() {
    return Math.floor(Math.random() * items.value.length);
}

function saveToStorage() {
    Storage.set(itemsSelectedStorageKey, selectedItems.value);
    Storage.set(itemStorageKey, items.value);
    Storage.set(itemDoneSelectedStorageKey, doneSelectedItems.value);
}

function startBomb() {
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["star"],
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"]
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ["star"]
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ["circle"]
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 500);
    setTimeout(shoot, 1000);
    setTimeout(shoot, 1500);
    setTimeout(shoot, 2000);
    setTimeout(shoot, 2500);
    setTimeout(shoot, 3000);
    setTimeout(shoot, 3500);
}

const winnerData = ref<any>(null);

function controlSpeed() {

    jumps += 1;
    runCircle();
    if (jumps > minimum_jumps + 10 && prize === current_index) {
        clearTimeout(timer);

        setTimeout(() => {
            startBomb();
            isSelectTriggered.value = true;
            const winSound = new Audio(WinSound);
            winSound.play();

            winnerDataToDisplay.value = {
                name: items.value[current_index].name,
                nickName: items.value[current_index].nickName
            };
            Swal.fire({
                html: `
                <div>
                    <div class="text-size-50px">
                        <span class="font-800">${items.value[current_index].name}</span>
                        <div>
                            the
                            <span class="font-800 text-red-600">${items.value[current_index].nickName}</span>
                        </div>
                    </div>
                    <div class="text-size-40px">has been Selected!</div>
                </div>
                `,
                icon: "success",
                showConfirmButton: false,
                position: "top"
            }).then((con) => {
                document.querySelector(`[data-order="${current_index}"]`)?.classList.remove("is-active");
                selectedItems.value.unshift(items.value[current_index]);
                items.value.splice(current_index, 1);
                saveToStorage();
                isLoading.value = false;
                isSelectTriggered.value = false;
            });

            prize = -1;
            jumps = 0;
        }, 2000);
    } else {
        if (jumps < minimum_jumps) speed -= 5;
        else if (jumps === minimum_jumps) {
            const random_number = generatePrizeNumber();
            prize = random_number;
        } else {
            if (jumps > minimum_jumps + 10 && prize === current_index + 1) speed += 600;
            else speed += 20;
        }
        if (speed < 40) speed = 40;
        timer = setTimeout(controlSpeed, speed);
    }
}

function init() {
    jumps = 0;
    speed = 100;
    prize = -1;
    isLoading.value = true;
    controlSpeed();
}

function addItem(item: any) {
    items.value.push(item);
    Storage.set(itemStorageKey, items.value);
}

onMounted(() => {
    const selectorItems = Storage.get(itemStorageKey);
    if (selectorItems) items.value = selectorItems;

    const selectedItemsSaved = Storage.get(itemsSelectedStorageKey);
    if (selectedItemsSaved) selectedItems.value = selectedItemsSaved;

    const doneSelectedItemsSaved = Storage.get(itemDoneSelectedStorageKey);
    if (doneSelectedItemsSaved) doneSelectedItems.value = doneSelectedItemsSaved;
});

function edit(item: ItemInterface | null, isInSelected = false) {
    showStoreModal.value = true;
    isInSelectedItems.value = isInSelected;
    if (addingItemComponentRef.value) addingItemComponentRef.value.toggleEdit(item);
}

function del(item: { index: number; data: ItemInterface }) {
    Swal.fire({
        title: "Delete Item?",
        html: "This will permanently remove the item.",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, Remove"
    }).then((con) => {
        if (con.isConfirmed) {
            items.value.splice(item.index, 1);
            saveToStorage();
        }
    });
}

function updateItem(item: any) {
    if (!isInSelectedItems.value) items.value[item.index] = item.data;
    else selectedItems.value[item.index] = item.data;
    saveToStorage();
}

function removeFromSelected(item: any) {
    items.value.push(item.data);
    selectedItems.value.splice(item.index, 1);
    saveToStorage();
}

function moveToSelected(data: { index: number; data: any }) {
    items.value.splice(data.index, 1);
    selectedItems.value.unshift(data.data);
    saveToStorage();
}

function clickFinished() {
    doneSelectedItems.value = [...doneSelectedItems.value, ...selectedItems.value];
    selectedItems.value = [];
    saveToStorage();
}

function removeFromDoneSelected(item: any) {
    items.value.push(item.data);
    doneSelectedItems.value.splice(item.index, 1);
    saveToStorage();
}

function reset() {
    items.value = [...items.value, ...selectedItems.value, ...doneSelectedItems.value];
    selectedItems.value = [];
    doneSelectedItems.value = [];

    saveToStorage();
}

function moveToDone(data: { index: number; data: any }) {
    items.value.splice(data.index, 1);
    doneSelectedItems.value.unshift(data.data);

    saveToStorage();
}


</script>

<template>
    <RainParticles v-if="isSelectTriggered" class="z-50" />
    <AddItem ref="addingItemComponentRef" @add="addItem" @update="updateItem" />
    <Transition>
        <div>

        </div>
    </Transition>
    <div class="flex gap-50px p-2 h-[100vh]">
        <div class="h-full w-full px-5 pt-5">
            <div class="flex justify-center" style="gap: 10px;">
                <button
                    class="bg-gray-200 text-gray-500 font-800 p-2 mb-5 cursor-pointer text-size-30px rounded-xl hover:bg-gray-300 active:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed select-none shadow-md"
                    @click="edit(null, false)">
                    +
                </button>
                <button
                    v-if="items.length > 1"
                    :disabled="isLoading"
                    class="bg-red-500 text-light-50 font-800 p-2 mb-5 cursor-pointer text-size-30px rounded-xl hover:bg-red-600 active:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed select-none"
                    @click="init"
                >
                    {{ isLoading ? "Rolling..." : "Start" }}
                </button>
            </div>
            <ItemCard
                :items="items"
                :moveButton="true"
                @delete="del"
                @edit="(item) => edit(item, false)"
                @move-to-selected="moveToSelected"
                @move-to-done="moveToDone"
            />
        </div>
        <div class="w-380px h-full flex flex-col ">
            <div class="h-1/2 flex flex-col shadow-lg p-3 border rounded-lg border-gray-100 mb-3">
                <h2 class="text-size-15px pb-3 h-30px">Selected:</h2>
                <div class="overflow-y-auto overflow-x-hidden px-4">
                    <ItemCard :items="selectedItems" @delete="removeFromSelected" @edit="(item) => edit(item, true)" />
                    <button
                        v-if="selectedItems.length >= 2"
                        class="text-center px-4 py-1 w-full mt-10px font-800 bg-red-500 text-white rounded-md"
                        @click="clickFinished()"
                    >
                        Finished
                    </button>
                </div>
            </div>
            <div class="h-1/2 flex flex-col shadow-lg p-3 border rounded-lg border-gray-100">
                <div class="flex justify-between h-30px items-center">
                    <h2 class=" pb-3">Done:</h2>
                    <button class="hover:underline" @click="reset">Reset</button>
                </div>
                <div class="overflow-y-auto overflow-x-hidden px-4">
                    <ItemCard
                        :items="doneSelectedItems"
                        @delete="removeFromDoneSelected"
                        @edit="(item) => edit(item, true)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.square {
    &.is-active {
        border: 10px solid gold !important;
    }
}

#swal2-html-container {
    overflow: visible !important;
}

.swal2-popup {
    z-index: 9999999;
}
</style>
