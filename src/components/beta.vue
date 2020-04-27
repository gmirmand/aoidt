<template>
    <md-content class="beta md-accent">
        Bêta 0.1.0
    </md-content>
</template>

<script>
  export default {
    name: "beta"
  }
</script>

<style scoped lang="scss">
.beta {
    position: fixed;
    top: 3em;
    right: 3em;
    z-index: 99999;
    padding: 0.5em;
    width: 15em;
    transform: translate(50%, -50%) rotate(45deg);

}
</style>
