<template>
    <div class="table-section">
        <form novalidate class="md-layout" @submit.prevent="validateTask">
            <md-table class="table-section__table">
                <md-table-toolbar>
                    <h2 class="md-title">
                        {{ $t('title') }}
                    </h2>
                </md-table-toolbar>

                <md-table-row>
                    <md-table-head>Nom</md-table-head>
                    <md-table-head md-numeric>Importance</md-table-head>
                    <md-table-head md-numeric>Durée</md-table-head>
                    <md-table-head>Temps</md-table-head>
                    <md-table-head>Indice OIDT</md-table-head>
                </md-table-row>

                <md-table-row v-for="(item, index) of tasks" :key="index">
                    <md-table-cell md-label="name" md-sort-by="name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="importance" md-sort-by="importance" md-numeric>{{ item.importance }}
                    </md-table-cell>
                    <md-table-cell md-label="duration" md-sort-by="duration" md-numeric>{{ item.duration }}
                    </md-table-cell>
                    <md-table-cell md-label="time" md-sort-by="time">{{ item.time }}</md-table-cell>
                    <md-table-cell md-label="index" md-sort-by="index">{{ item.index }}</md-table-cell>
                </md-table-row>

                <md-table-row>
                    <md-table-cell md-label="name" md-sort-by="name" md-numeric>
                        <md-field :class="getValidationClass('name')">
                            <label for="name">Nom</label>
                            <md-input name="name" id="name" v-model="form.name" :disabled="sending"/>
                            <span class="md-error" v-if="!$v.form.name.required">Un nom de tâche est requis</span>
                            <span class="md-error" v-else-if="!$v.form.name.minlength">3 caractères minimum</span>
                        </md-field>
                    </md-table-cell>
                    <md-table-cell md-label="importance" md-sort-by="importance">
                        <md-field :class="getValidationClass('importance')">
                            <label for="importance">Importance</label>
                            <md-input type="number" id="importance" name="importance" v-model="form.importance"
                                      :disabled="sending"/>
                            <span class="md-error"
                                  v-if="!$v.form.importance.required">Le niveau d'importance est requis</span>
                            <span class="md-error" v-else-if="!$v.form.importance.maxlength">Doit être compris entre 1 et 5</span>
                        </md-field>
                    </md-table-cell>
                    <md-table-cell md-label="duration" md-sort-by="duration">
                        <md-field :class="getValidationClass('duration')">
                            <label for="duration">Durée</label>
                            <md-input type="number" id="duration" name="duration" v-model="form.duration"
                                      :disabled="sending"/>
                            <span class="md-error"
                                  v-if="!$v.form.duration.required">La durée de la tâche est requise</span>
                            <span class="md-error" v-else-if="!$v.form.duration.maxlength">La durée de la tâche doit être comprise entre 0 et 999</span>
                        </md-field>
                    </md-table-cell>
                    <md-table-cell md-label="time" md-sort-by="time">
                        <md-datepicker
                                :class="getValidationClass('time')"
                                id="time" name="time"
                                v-model="form.time"
                                :disabled="sending"
                                md-immediately>
                            <label for="time">Temps (échéance)</label>
                            <span class="md-error" v-if="!$v.form.time.required">
                                Une date d'échéance est requise
                            </span>
                        </md-datepicker>
                    </md-table-cell>
                    <md-table-cell md-label="index" md-sort-by="index">
                        <md-card-actions>
                            <md-button type="submit" class="md-primary" :disabled="sending">Create task</md-button>
                        </md-card-actions>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </form>
    </div>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {
    required,
    minLength,
    between,
  } from 'vuelidate/lib/validators'

  export default {
    name: "TableSection",
    mixins: [validationMixin],
    props: {
      tasks: {
        type: Array,
        default: undefined
      },
    },
    data: () => ({
      form: {
        name: null,
        importance: null,
        duration: null,
        time: null,
      },
      sending: false,
      taskSaved: false,
    }),
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(3)
        },
        importance: {
          required,
          between: between(1, 5),
        },
        duration: {
          required,
          between: between(0, 999)
        },
        time: {
          required,
        },
      }
    },
    methods: {
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      validateTask() {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveTask()
        }
      },
      saveTask() {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.taskSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      clearForm() {
        this.$v.$reset()
        this.form.name = null
        this.form.importance = null
        this.form.duration = null
        this.form.time = null
      },
    },
  }
</script>

<style scoped lang="scss">
    .table-section {
        .md-field {
            margin-top: 0;
            /*margin-bottom: 0;*/
        }

        &__table {
            width: 100%;

            &.md-card {
                margin-right: 0;
                margin-left: 0;
            }
        }
    }
</style>

<i18n>
    {
        "fr": {
            "title": "Mes tâches"
        }
    }
</i18n>
