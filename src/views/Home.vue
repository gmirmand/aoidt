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
            <div class="home__info md-layout md-elevation-5">
                <h2 class="md-title">
                    {{ $t('info-bar') }}
                </h2>
            </div>
            <br>
            <infos-section
                    :total-hours="getTotalHours()"
                    :total-hours-week="getWeekHours()"
                    :average-week="getWeekAverage()"
                    :total-hours-today="getDayHours()"
                    :total-hours-next-week="getNextWeekHours()"
            ></infos-section>

            <table-section :tasks="tasks"></table-section>
        </md-app-content>
    </md-app>
</template>

<script>
  import InfosSection from "../components/InfosSection";
  import TableSection from "../components/TableSection";

  import {mapState} from 'vuex'

  export default {
    name: 'Home',
    components: {TableSection, InfosSection},
    computed: mapState({
      tasks: state => state.tasks
    }),
    methods: {
      getTotalHours() {
        return this.$store.getters.getTaskAttrSomme('duration')
      },
      getWeekHours() {
        return this.$store.getters.getTaskWeekSomme
      },
      getWeekAverage() {
        return this.$store.getters.getTaskWeekAverage
      },
      getDayHours() {
        return this.$store.getters.getTaskDaySomme
      },
      getNextWeekHours() {
        return this.$store.getters.getTaskNextWeekSomme
      }
    },
  }
</script>

<style scoped lang="scss">
    .container {
        ::v-deep.md-app-container {
            max-width: 100vw;
            overflow-x: hidden;
        }
    }

    .md-app {
        max-height: 100vh;
        border: 1px solid rgba(#000, .12);
    }

    .md-app-toolbar {
        height: 12.5em;
    }

    .home {
        &__info {
            padding: 1em 2em;
        }
    }
</style>

<i18n>
    {
        "fr": {
            "title": "Agenda OIDT",
            "info-bar": "Les données sont enregistrées sur votre appareil. De ce fait, veuillez toujours utiliser le même navigateur sur le même appareil pour conserver vos tâches."
        }
    }
</i18n>
