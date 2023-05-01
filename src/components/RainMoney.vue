<template>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
</template>
<style lang="scss">
html,
body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    // background: linear-gradient(#123, #111);
}

.snowflake {
    z-index: 99;
    width: 100px;
    height: 50px;
    background: url(https://i.imgur.com/TO5YRt3.jpg);
    // border-radius: 50%;
    position: absolute;
    background-size: 80px 40px;
    background-repeat: no-repeat;
    top: -5vh;
}

@keyframes snowfall {
    0% {
        transform: translate3d(var(--left-ini), 0, 0);
    }
    100% {
        transform: translate3d(var(--left-end), 110vh, 0);
    }
}

@keyframes bill{
    0% { -moz-transform: rotate(-180deg) translate(0px, 0px) rotateX(-360deg) rotateY(-180deg); border-bottom-left-radius: 0px; border-top-left-radius: 0px;}
    10% { border-bottom-right-radius: 0px; border-top-right-radius: 3px;}
    15% { border-bottom-right-radius: 35px; border-bottom-left-radius: 0px; border-top-right-radius: 60px;}
    50% { -moz-transform: rotate(180deg) translate(10px, 95px) rotateX(180deg) rotateY(180deg); border-bottom-left-radius: 50px;}
    60% { border-top-left-radius: 60px; border-top-right-radius: 3px;}
    70% { border-top-left-radius: 10px;}
}

@for $i from 1 through 50 {
    .snowflake:nth-child(#{$i}) {
        --size: #{random(5) * 0.2}vw;
        --left-ini: #{random(20) - 10}vw;
        --left-end: #{random(20) - 10}vw;
        left: #{random(100)}vw;
        animation: snowfall #{5 + random(10)}s linear infinite, bill;
        animation-delay: -#{random(10)}s;
    }
}

/* added small blur every 6 snowflakes*/
.snowflake:nth-child(6n) {
    filter: blur(1px);
}
</style>
