<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
    let confettiPlayers: Animation[] = [];

    function makeItConfetti() {
        let confetti = document.querySelectorAll(".confetti");

        if (!confetti[0].animate) {
            return false;
        }

        for (let i = 0, len = confetti.length; i < len; ++i) {
            const candyCorn = confetti[i];
            candyCorn.innerHTML = "<div class=\"rotate\"><div class=\"askew\"></div></div>";
            const scale = Math.random() * 0.7 + 0.3;
            const player = candyCorn.animate(
                [
                    {
                        transform: `translate3d(${(i / len) * 100}vw,-5vh,0) scale(${scale}) rotate(0turn)`,
                        opacity: scale
                    },
                    {
                        transform: `translate3d(${(i / len) * 100 + 10}vw,105vh,0) scale(${scale}) rotate(${
                            Math.random() > 0.5 ? "" : "-"
                        }2turn)`,
                        opacity: 1
                    }
                ],
                {
                    duration: Math.random() * 3000 + 5000,
                    iterations: Infinity,
                    delay: -(Math.random() * 7000)
                }
            );

            confettiPlayers.push(player);
        }
    }

    makeItConfetti();
    onChange({ currentTarget: { value: "bookmarks" } });

    document?.getElementById("type")?.addEventListener("change", onChange);

    function onChange(e: { currentTarget: any; }) {
        document.body.setAttribute("data-type", e.currentTarget.value);
        confettiPlayers.forEach((player) => (player.playbackRate = e.currentTarget.value === "bookmarks" ? 2 : 1));
    }
});
</script>
<template>
    <div class="confetti-land">
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
    </div>

    <select id="type">
        <option value="cornfetti">Candy Corn</option>
        <option value="leaves">Fall Leaves</option>
        <option selected value="bookmarks">Bookmarks</option>
        <!--option value="snowflake">Snowflakes</option-->
    </select>
</template>
<style>
.confetti {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    position: absolute;
    top: -1rem;
    left: 0;
    z-index: 50;
}

.confetti .rotate {
    animation: driftyRotate 1s infinite both ease-in-out;
    perspective: 1000px;
}

.confetti .askew {
    background: linear-gradient(
        var(--grad-direction, to bottom),
        hsl(63, 100%, 50%) 25%,
        hsl(23, 100%, 50%) 0% 66.667%,
        hsl(43, 100%, 100%) 0% 100%
    );
    transform: skewY(10deg);
    width: 2rem;
    height: 3.2rem;
    animation: drifty 1s infinite alternate both ease-in-out;
    perspective: 1000px;
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}

.confetti:nth-of-type(7n) .askew {
    animation-delay: -0.6s;
    animation-duration: 2.25s;
}

.confetti:nth-of-type(7n + 1) .askew {
    animation-delay: -0.879s;
    animation-duration: 3.5s;
}

.confetti:nth-of-type(7n + 2) .askew {
    animation-delay: -0.11s;
    animation-duration: 1.95s;
}

.confetti:nth-of-type(7n + 3) .askew {
    animation-delay: -0.246s;
    animation-duration: 0.85s;
}

.confetti:nth-of-type(7n + 4) .askew {
    animation-delay: -0.43s;
    animation-duration: 2.5s;
}

.confetti:nth-of-type(7n + 5) .askew {
    animation-delay: -0.56s;
    animation-duration: 1.75s;
}

.confetti:nth-of-type(7n + 6) .askew {
    animation-delay: -0.76s;
    animation-duration: 1.5s;
}

.confetti:nth-of-type(9n) .rotate {
    animation-duration: 2s;
}

.confetti:nth-of-type(9n + 1) .rotate {
    animation-duration: 2.3s;
}

.confetti:nth-of-type(9n + 2) .rotate {
    animation-duration: 1.1s;
}

.confetti:nth-of-type(9n + 3) .rotate {
    animation-duration: 0.75s;
}

.confetti:nth-of-type(9n + 4) .rotate {
    animation-duration: 4.3s;
}

.confetti:nth-of-type(9n + 5) .rotate {
    animation-duration: 3.05s;
}

.confetti:nth-of-type(9n + 6) .rotate {
    animation-duration: 2.76s;
}

.confetti:nth-of-type(9n + 7) .rotate {
    animation-duration: 7.6s;
}

.confetti:nth-of-type(9n + 8) .rotate {
    animation-duration: 1.78s;
}

@keyframes drifty {
    0% {
        transform: skewY(10deg) translate3d(-250%, 0, 0);
    }
    100% {
        transform: skewY(-12deg) translate3d(250%, 0, 0);
    }
}

@keyframes driftyRotate {
    0% {
        transform: rotateX(0);
    }
    100% {
        transform: rotateX(359deg);
    }
}

select {
    position: absolute;
    left: 1rem;
    top: 1rem;
    font-size: 1rem;
    z-index: 100;
}

[data-type="leaves"] .confetti:nth-child(4n) {
    color: hsl(343, 80%, 30%);
}

[data-type="leaves"] .confetti:nth-child(4n + 1) {
    color: hsl(103, 80%, 30%);
}

[data-type="leaves"] .confetti:nth-child(4n + 2) {
    color: hsl(43, 80%, 40%);
}

[data-type="leaves"] .confetti:nth-child(4n + 3) {
    color: hsl(23, 70%, 40%);
}

[data-type="bookmarks"] .confetti:nth-child(4n) {
    color: hsl(18, 100%, 50%);
}

[data-type="bookmarks"] .confetti:nth-child(4n + 1) {
    color: hsl(183, 100%, 50%);
}

[data-type="bookmarks"] .confetti:nth-child(4n + 2) {
    color: hsl(43, 100%, 50%);
}

[data-type="bookmarks"] .confetti:nth-child(4n + 3) {
    color: hsl(133, 100%, 90%);
}

[data-type="leaves"] .confetti .askew {
    background: currentColor linear-gradient(to right, rgba(0, 0, 0, 0) 48%, rgba(0, 0, 0, 0.12) 0% 52%, rgba(0, 0, 0, 0) 92%);
    width: 2.5rem;
    height: 4.2rem;
    clip-path: polygon(
        56% 0%,
        56% 16%,
        60% 20%,
        85% 40%,
        100% 60%,
        85% 75%,
        70% 90%,
        50% 100%,
        15% 75%,
        0% 60%,
        15% 40%,
        40% 20%,
        44% 16%,
        44% 0%
    );
}

[data-type="snowflake"] .confetti .askew {
    background: hsl(223, 40%, 96%);
    clip-path: polygon(
        evenodd,
        20% 0%,
        80% 0%,
        100% 20%,
        100% 80%,
        80% 100%,
        20% 100%,
        0% 80%,
        0% 20%,
        22% 2%,
        78% 2%,
        98% 22%,
        98% 78%,
        78% 98%,
        22% 98%,
        2% 78%,
        2% 22%,
        30% 10%,
        70% 10%,
        90% 30%,
        90% 70%,
        70% 90%,
        30% 90%,
        10% 70%,
        10% 30%,
        32% 12%,
        68% 12%,
        88% 32%,
        88% 68%,
        68% 88%,
        32% 88%,
        12% 68%,
        12% 32%,
        40% 20%,
        60% 20%,
        80% 40%,
        80% 60%,
        60% 80%,
        40% 80%,
        20% 60%,
        20% 40%
    );
}

[data-type="bookmarks"] .confetti .askew {
    background: currentColor;
    width: 1rem;
    height: 2rem;
    clip-path: polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 50% 90%, 0% 100%);
}
</style>
