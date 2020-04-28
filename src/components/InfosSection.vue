<template>
    <div class="infos-section md-layout md-alignment-top-center">
        <info-card :value="totalHours">
            <template #tooltip-title>
                {{ $t('totalHours.full') }}
            </template>
            <template #title>
                {{ $t($mq.l ? 'totalHours.short' : 'totalHours.full') }}
            </template>
        </info-card>
        <info-card :value="totalHoursWeek">
            <template #tooltip-title>
                {{ $t('totalHoursWeek.full') }}
            </template>
            <template #title>
                {{ $t($mq.l ? 'totalHoursWeek.short' : 'totalHoursWeek.full') }}
            </template>
        </info-card>
        <info-card :value="averageWeek">
            <template #tooltip-title>
                {{ $t('averageWeek.full') }}
            </template>
            <template #title>
                {{ $t($mq.l ? 'averageWeek.short' : 'averageWeek.full') }}
            </template>
        </info-card>
<!--        <info-card :value="totalHoursToday">-->
<!--            <template #tooltip-title>-->
<!--                {{ $t('totalHoursToday.full') }}-->
<!--            </template>-->
<!--            <template #title>-->
<!--                {{ $t($mq.l ? 'totalHoursToday.short' : 'totalHoursToday.full') }}-->
<!--            </template>-->
<!--        </info-card>-->
        <info-card :value="totalHoursNextWeek">
            <template #tooltip-title>
                {{ $t('totalHoursNextWeek.full') }}
            </template>
            <template #title>
                {{ $t($mq.l ? 'totalHoursNextWeek.short' : 'totalHoursNextWeek.full') }}
            </template>
        </info-card>
    </div>
</template>

<script>
  import InfoCard from "./InfoCard";

  export default {
    name: "InfosSection",
    components: {InfoCard},
    props: {
      totalHours: {
        type: Number,
        default: 0
      },
      totalHoursWeek: {
        type: Number,
        default: 0
      },
      averageWeek: {
        type: Number,
        default: 0
      },
      totalHoursToday: {
        type: Number,
        default: 0
      },
      totalHoursNextWeek: {
        type: Number,
        default: 0
      },
    },
  }
</script>

<style scoped>

</style>

<i18n>
    {
        "fr": {
            "totalHours": {
                "short": "Totales prévues",
                "full": "Heures totales de travail prévues"
            },
            "totalHoursWeek": {
                "short": "Prévues semaine",
                "full": "Heures de travail prévues cette semaine"
            },
            "averageWeek": {
                "short": "Moyenne semaine",
                "full": "Moyenne d'heures de travail par jour cette semaine"
            },
            "totalHoursToday": {
                "short": "Prévues aujourd'hui",
                "full": "Heures de travail prévues aujourd'hui"
            },
            "totalHoursNextWeek": {
                "short": "Semaine prochaine",
                "full": "Heures de travail prévues semaine prochaine"
            }
        }
    }
</i18n>
