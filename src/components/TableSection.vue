<template>
    <div class="table-section">
        <form novalidate class="md-layout" @submit.prevent="validateTask">
            <md-table class="table-section__table" md-sort="index" md-sort-order="desc" v-model="tasks">
                <md-table-toolbar>
                    <h2 class="md-title">
                        {{ $t('title') }}
                    </h2>
                </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell>
                        <md-button @click="deleteTask(item)" class="md-icon-button md-accent">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-table-cell>
                    <md-table-cell :md-label="$t('columns.name.label')" md-sort-by="name">
                        {{ item.name }}
                    </md-table-cell>
                    <md-table-cell :md-label="`${$t('columns.importance.label')} ${$t('columns.importance.unit')}`"
                                   md-sort-by="importance" md-numeric>
                        {{ item.importance }}
                    </md-table-cell>
                    <md-table-cell :md-label="`${$t('columns.duration.label')} ${$t('columns.importance.unit')}`"
                                   md-sort-by="duration" md-numeric>
                        {{ item.duration }}
                    </md-table-cell>
                    <md-table-cell :md-label="`${$t('columns.time.label')} ${$t('columns.time.unit')}`"
                                   md-sort-by="time">
                        {{ item.time | date }}
                    </md-table-cell>
                    <md-table-cell :md-label="$t('columns.index.label')" md-sort-by="index">
                        {{ item.index }}
                    </md-table-cell>
                </md-table-row>
            </md-table>
            <md-table class="table-section__table">
                <md-table-row>
                    <md-table-cell>
                        <md-button type="submit" class="md-icon-button md-raised md-primary">
                            <md-icon>add</md-icon>
                        </md-button>
                    </md-table-cell>
                    <md-table-cell md-label="name" md-sort-by="name" md-numeric>
                        <md-field :class="getValidationClass('name')">
                            <label for="name">{{ $t('columns.name.label') }}</label>
                            <md-input name="name" id="name" v-model="form.name" :disabled="sending"/>
                            <span class="md-error" v-if="!$v.form.name.required">
                                {{ $t('columns.name.errors.required') }}
                            </span>
                            <span class="md-error" v-else-if="!$v.form.name.minlength">
                                {{ $t('columns.name.errors.length') }}
                            </span>
                        </md-field>
                    </md-table-cell>
                    <md-table-cell md-label="importance" md-sort-by="importance">
                        <md-field :class="getValidationClass('importance')">
                            <label for="importance">
                                {{ $t('columns.importance.label') }}
                            </label>
                            <md-input type="number" id="importance" name="importance" v-model="form.importance"
                                      :disabled="sending"/>
                            <span class="md-error"
                                  v-if="!$v.form.importance.required">
                                {{ $t('columns.importance.errors.required') }}
                            </span>
                            <span class="md-error" v-else-if="!$v.form.importance.between">
                                {{ $t('columns.importance.errors.between') }}
                            </span>
                        </md-field>
                    </md-table-cell>
                    <md-table-cell md-label="duration" md-sort-by="duration">
                        <md-field :class="getValidationClass('duration')">
                            <label for="duration">
                                {{ $t('columns.duration.label') }}
                            </label>
                            <md-input type="number" id="duration" name="duration" v-model="form.duration"
                                      :disabled="sending"/>
                            <span class="md-error"
                                  v-if="!$v.form.duration.required">
                                {{ $t('columns.duration.errors.required') }}
                            </span>
                            <span class="md-error" v-else-if="!$v.form.duration.between">
                                {{ $t('columns.duration.errors.between') }}
                            </span>
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
                                {{ $t('columns.time.errors.required') }}
                            </span>
                        </md-datepicker>
                    </md-table-cell>
                    <md-table-cell md-label="index" md-sort-by="index">
                        <md-card-actions>
                            <md-button type="submit" class="md-primary" :disabled="sending">
                                {{ $t('submit') }}
                            </md-button>
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
      deleteTask(item) {
        this.$store.dispatch('deleteTask', item.id)
      },
      saveTask() {
        this.sending = true

        let payload = {
          name: this.form.name,
          importance: this.form.importance,
          duration: this.form.duration,
          time: this.form.time
        };
        this.$store.dispatch('addTask', payload)

        this.taskSaved = true
        this.sending = false
        this.clearForm()
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
            "title": "Mes tâches",
            "columns": {
                "name": {
                    "label": "Nom",
                    "errors": {
                        "required": "Un nom de tâche est requis",
                        "length": "3 caractères minimum"
                    }
                },
                "importance": {
                    "label": "Importance",
                    "unit": "(de 1 à 5)",
                    "errors": {
                        "required": "Le niveau d'importance est requis",
                        "between": "Doit être compris entre 1 et 5"
                    }
                },
                "duration": {
                    "label": "Durée",
                    "unit": "(en heures)",
                    "errors": {
                        "required": "Une durée de la tâche est requise",
                        "between": "Doit être compris entre 0 et 999"
                    }
                },
                "time": {
                    "label": "Temps",
                    "unit": "(échéance)",
                    "errors": {
                        "required": "Une date d'échéance est requise"
                    }
                },
                "index": {
                    "label": "Indice IDT"
                }
            },
            "submit": "Créer la tâche"
        }
    }
</i18n>
