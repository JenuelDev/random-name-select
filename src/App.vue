<script setup lang="ts">
import Swal from "sweetalert2";
import { Storage } from "storage-container-js";
import AddItem from "./components/AddNewItems.vue";
import { ref } from "vue";

// const prizes: any = {
//     0: "🙈",
//     1: "🤢",
//     2: "💩",
//     3: "🦊",
//     4: "👀",
//     5: "👾",
//     6: "👻",
//     7: "🤖",
// };

const items = ref([
    {
        name: "james",
        nickname: "bloodier",
        img: "https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png",
    },
    {
        name: "jenuel",
        nickname: "solo flight",
        img: "https://www.topdoctors.co.uk/files/Image/large/9d5dbb894ed1236a95d634bb60e5c570.jpg",
    },
]);

const total_items = 8;
const minimum_jumps = 30;
let current_index = -1;
let jumps = 0;
let speed = 30;
let timer: any = 0;
let prize = -1;

function runCircle() {
    document
        .querySelector(`[data-order="${current_index}"]`)
        ?.classList.remove("is-active");

    current_index += 1;

    if (current_index > items.value.length - 1) {
        current_index = 0;
    }

    document
        .querySelector(`[data-order="${current_index}"]`)
        ?.classList.add("is-active");
}

function generatePrizeNumber() {
    return Math.floor(Math.random() * items.value.length);
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
        });

        prize = -1;
        jumps = 0;
    } else {
        if (jumps < minimum_jumps) {
            speed -= 5;
        } else if (jumps === minimum_jumps) {
            const random_number = generatePrizeNumber();
            prize = random_number;
        } else {
            if (jumps > minimum_jumps + 10 && prize === current_index + 1) {
                speed += 600;
            } else {
                speed += 20;
            }
        }
        if (speed < 40) {
            speed = 40;
        }

        timer = setTimeout(controlSpeed, speed);
    }
}

function init() {
    jumps = 0;
    speed = 100;
    prize = -1;
    controlSpeed();
}
</script>

<template>
    <div style="display: flex">
        <div>
            <AddItem />
        </div>
        <div>
            <div class="square__start-btn" id="js-start" @click="init">
                <div>START</div>
            </div>
            <section class="flex" id="js-lotto">
                <div
                    v-for="(item, i) in items"
                    :key="i"
                    class="square border-20px"
                    :data-order="i"
                >
                    <div>{{ item.name }}</div>
                    <div>{{ item.nickname }}</div>
                    <div class="w-50px h-50px overflow-hidden">
                        <img :src="item.img" class="h-full" wid alt="" />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style lang="scss">
.square {
    &.is-active {
        border: 20px solid gold !important;
    }
}
</style>
