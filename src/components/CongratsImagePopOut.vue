<script setup lang="ts">
import CongratsIceGif from "./../assets/images/congrats-icegif-4.gif";
import FartFlung from "./../assets/images/FarflungDirectAndeancat-max-1mb.gif";
import Gip from "./../assets/images/giphy.gif";

const props = defineProps({
    show: { type: Boolean, default: false },
});
</script>
<template>
    <div>
        <img
            class="fixed -right-250px top-200px transition-all"
            :class="{ '!right-20px': $props.show }"
            :src="CongratsIceGif"
            style="z-index: 99999999999"
        />
        <img
            class="fixed -left-290px top-200px transition-all"
            :class="{ '!left-20px': $props.show }"
            :src="FartFlung"
            style="z-index: 99999999999"
        />
        <img
            class="fixed left-[40%] -bottom-280px mx-auto transition-all"
            :class="{ '!bottom-20px': $props.show }"
            :src="Gip"
            style="z-index: 99999999999"
        />
    </div>
</template>
