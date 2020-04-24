<template>
    <md-app class="container" md-waterfall md-mode="flexible">
        <md-app-toolbar class="md-large md-primary">
            <div class="md-toolbar-row md-toolbar-offset">
                <span class="md-display-1">Agenda OIDT</span>
            </div>
        </md-app-toolbar>

        <md-app-content class="md-layout md-alignment-top-center">
            <info-card>
                <template #title :value="1">
                    Title 1
                </template>
            </info-card>
            <info-card>
                <template #title :value="1">
                    Title 1
                </template>
            </info-card>
            <info-card>
                <template #title :value="1">
                    Title 1
                </template>
            </info-card>
            <info-card>
                <template #title :value="1">
                    Title 1
                </template>
            </info-card>
        </md-app-content>
    </md-app>
</template>

<script>
  // @ is an alias to /src

  import InfoCard from "../components/InfoCard";

  export default {
    name: 'Home',
    components: {InfoCard},
  }
</script>

<style scoped lang="scss">
    .container {
        ::v-deep.md-app-container {
            max-width: 100vw;
            overflow: hidden;
        }
    }

    .md-app {
        max-height: 100vh;
        border: 1px solid rgba(#000, .12);
    }

    .md-app-toolbar {
        height: 12.5em;
    }
</style>
