<template>
    <md-app class="container" md-waterfall md-mode="flexible">
        <md-app-toolbar class="md-large md-primary">
            <div class="md-toolbar-row md-toolbar-offset">
                <span class="md-display-1">
                    {{ $t('title') }}
                </span>
            </div>
        </md-app-toolbar>

        <md-app-content>
            <infos-section
                    :total-hours="25"
                    :total-hours-week="10"
                    :average-week="1.25"
                    :total-hours-today="4"
                    :total-hours-next-week="13"
            ></infos-section>
        </md-app-content>
    </md-app>
</template>

<script>
  import InfosSection from "../components/InfosSection";

  export default {
    name: 'Home',
    components: {InfosSection},
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
