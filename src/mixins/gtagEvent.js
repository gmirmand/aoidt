import Vue from 'vue'

Vue.mixin({
  methods: {
    gtagEvent(category, action, label, value) {
      this.$gtag.event(action, {
        'event_category': category,
        'event_label': label,
        'value': value
      })
    }
  },
})
