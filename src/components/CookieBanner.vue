<template>
    <md-dialog v-if="rgpd === null" :md-active.sync="showDialog">
        <md-dialog-title>
            {{ $t('preferences') }}
        </md-dialog-title>

        <md-tabs md-dynamic-height>
            <md-tab :md-label="$t('service.analytics.title')">
                <div class="cookie-banner">
                    <p><strong>{{ $t('encourage') }}</strong></p>
                    <p>{{ $t('service.analytics.description') }}</p>
                </div>
            </md-tab>
        </md-tabs>

        <md-dialog-actions class="cookie-banner__buttons">
            <md-button class="md-transparent" @click="disagree">{{ $t('disagree') }}</md-button>
            <md-button class="md-raised md-primary" @click="agree">{{ $t('agree') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
  import {bootstrap} from 'vue-gtag'
  import {mapState} from 'vuex'

  export default {
    name: "CookieBanner",
    data: () => ({
      showDialog: true
    }),
    computed: mapState({
      rgpd: state => state.rgpd
    }),
    mounted() {
      if(this.rgpd) {
        bootstrap()
      }
    },
    methods: {
      agree() {
        bootstrap().then(() => {
          this.$store.commit('setRGPD', true)
        })
      },
      disagree() {
        this.$store.commit('setRGPD', false)
        window.location.reload();
      }
    }
  }
</script>

<style scoped lang="scss">
    .cookie-banner {
        &__buttons {
            margin: 1em;
        }
    }
</style>

<i18n>
    {
        "fr": {
            "preferences": "Préférences",
            "encourage": "On a besoin de votre aide !",
            "agree": "Accepter les cookies",
            "disagree": "refuser",
            "service": {
                "analytics": {
                    "title": "Google Analytics",
                    "description": "Ce site utilise des cookies de Google Analytics. En acceptant, vous nous aidez à identifier le contenu et les fonctionnalités qui vous intéressent le plus ainsi qu'à repérer certains dysfonctionnements. Au-delà de cette l'analyse, ces données ne sont ni partagés, ni revendus par notre service."
                }
            }
        }
    }
</i18n>
