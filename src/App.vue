<script setup lang="ts">
import Swal from "sweetalert2";
import { Storage } from "storage-container-js";
import AddItem from "./components/AddNewItems.vue";
import { onMounted, ref } from "vue";
import ItemCard from "./components/ItemCard.vue";
import { NCard } from "naive-ui";

type ItemInterface = { name: string; nickName: string; img: string; selectedType: string };
const itemStorageKey = "random-selector-items";
const itemsSelectedStorageKey = "item-selected-items";
const items = ref<Array<ItemInterface>>([]);
const selectedItems = ref<Array<ItemInterface>>([]); // contains array of index selected
const addingItemComponentRef = ref<null | { toggleEdit: Function }>(null);

const minimum_jumps = 30;
let current_index = -1;
let jumps = 0;
let speed = 30;
let timer: any = 0;
let prize = -1;

function runCircle() {
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
}

function controlSpeed() {
    jumps += 1;
    runCircle();
    if (jumps > minimum_jumps + 10 && prize === current_index) {
        clearTimeout(timer);

        Swal.fire({
            title: `You Have Won a Prize ${items.value[current_index].name}`,
            text: "Congratulations!",
            icon: "success",
        }).then((con) => {
            document.querySelector(`[data-order="${current_index}"]`)?.classList.remove("is-active");
            selectedItems.value.push(items.value[current_index]);
            items.value.splice(current_index, 1);
            saveToStorage();
        });

        prize = -1;
        jumps = 0;
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
    controlSpeed();
}

function addItem(item: any) {
    console.log(item);
    items.value.push(item);
    Storage.set(itemStorageKey, items.value);
}

onMounted(() => {
    const selectorItems = Storage.get(itemStorageKey);
    if (selectorItems) items.value = selectorItems;

    const selectedItemsSaved = Storage.get(itemsSelectedStorageKey);
    if (selectedItemsSaved) selectedItems.value = selectedItemsSaved;
});

function edit(item: ItemInterface) {
    if (addingItemComponentRef.value) addingItemComponentRef.value.toggleEdit(item);
}

function del(item: { index: number; data: ItemInterface }) {
    Swal.fire({
        title: "Delete Item?",
        html: "This will permanently remove the item.",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, Remove",
    }).then((con) => {
        if (con.isConfirmed) {
            items.value.splice(item.index, 1);
            saveToStorage();
        }
    });
}

function updateItem(item: any) {
    items.value[item.index] = item.data;
    saveToStorage();
}

function removeFromSelected(item: any) {
    items.value.push(item.data);
    selectedItems.value.splice(item.index, 1);
    saveToStorage();
}
</script>

<template>
    <div class="flex gap-50px p-5 h-[100vh]">
        <div class="h-full w-full max-w-300px">
            <NCard>
                <AddItem ref="addingItemComponentRef" @add="addItem" @update="updateItem" />
            </NCard>
        </div>
        <div class="h-full w-full">
            <div class="flex">
                <div
                    v-if="items.length"
                    class="bg-red-500 text-light-50 font-800 p-2 mb-5 cursor-pointer"
                    @click="init"
                >
                    <div>START</div>
                </div>
                <div v-else>Items are Empty, Add items by filling out the form.</div>
            </div>
            <ItemCard :items="items" @edit="edit" @delete="del" />
        </div>
        <div class="w-full max-w-300px h-full overflow-y-auto overflow-x-hidden pr-10">
            <h2 class="text-size-20px">Selected:</h2>
            <ItemCard :items="selectedItems" @edit="edit" @delete="removeFromSelected" />
        </div>
    </div>
</template>

<style lang="scss">
.square {
    &.is-active {
        border: 10px solid gold !important;
    }
}
</style>
