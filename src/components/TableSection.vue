<template>
    <div class="table-section">
        <form v-if="tasks && tasks.length > 0" novalidate class="md-layout" @submit.prevent="validateTask">
            <md-table class="table-section__table" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder"
                      v-model="tasks">
                <md-table-toolbar>
                    <h2 class="md-title">
                        <strong>{{ $t('title') }}</strong>
                    </h2>
                </md-table-toolbar>
                <md-table-row slot="md-table-row" slot-scope="{ item }"
                              :class="[isExpired(item) && 'table-section__expired', isToday(item) && 'table-section__today']">
                    <md-table-cell>
                        <md-button @click="deleteTask(item)" class="md-icon-button md-accent">
                            <md-icon>delete</md-icon>
                        </md-button>
                        <md-button type="button" v-show="editingTaskId !== item.id" @click="editTask(item)"
                                   class="md-icon-button md-primary">
                            <md-icon>edit</md-icon>
                        </md-button>
                        <md-button v-show="editingTaskId === item.id" type="submit" :disabled="sending"
                                   class="md-icon-button md-primary">
                            <md-icon>save</md-icon>
                        </md-button>
                    </md-table-cell>
                    <md-table-cell :md-label="$t('columns.name.label')" md-sort-by="name">
                        <span v-if="editingTaskId !== item.id">
                            {{ item.name }}
                        </span>
                        <md-field v-else :class="getValidationClass('name')">
                            <label for="name-edit">{{ $t('columns.name.label') }}</label>
                            <md-input name="name" id="name-edit" v-model="form.name" :disabled="sending"/>
                            <span class="md-error" v-if="!$v.form.name.required">
                                {{ $t('columns.name.errors.required') }}
                            </span>
                            <span class="md-error" v-else-if="!$v.form.name.minlength">
                                {{ $t('columns.name.errors.length') }}
                            </span>
                        </md-field>
                    </md-table-cell>
                    <md-table-cell :md-label="`${$t('columns.importance.label')} ${$t('columns.importance.unit')}`"
                                   md-sort-by="importance" md-numeric>
                        <span v-if="editingTaskId !== item.id">
                            {{ item.importance }}
                        </span>
                        <md-field v-else :class="getValidationClass('importance')">
                            <label for="importance-edit">
                                {{ $t('columns.importance.label') }}
                                {{ $t('columns.importance.unit') }}
                            </label>
                            <md-select id="importance-edit" name="importance" v-model="form.importance"
                                       :disabled="sending">
                                <md-option value="1">1</md-option>
                                <md-option value="2">2</md-option>
                                <md-option value="3">3</md-option>
                                <md-option value="4">4</md-option>
                                <md-option value="5">5</md-option>
                            </md-select>
                            <span class="md-error"
                                  v-if="!$v.form.importance.required">
                                {{ $t('columns.importance.errors.required') }}
                            </span>
                            <span class="md-error" v-else-if="!$v.form.importance.between">
                                {{ $t('columns.importance.errors.between') }}
                            </span>
                        </md-field>
                    </md-table-cell>
                    <md-table-cell
                            :md-label="`${$t('columns.duration.label')} ${$t('columns.importance.unit')}`"
                            md-sort-by="duration"
                            md-numeric>
                        <span v-if="editingTaskId !== item.id">
                            {{ item.duration }}
                        </span>
                        <md-field v-else :class="getValidationClass('duration')">
                            <label for="duration-edit">
                                {{ $t('columns.duration.label') }}
                                {{ $t('columns.duration.unit') }}
                            </label>
                            <md-input type="number" id="duration-edit" name="duration" v-model="form.duration"
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
                    <md-table-cell :md-label="`${$t('columns.time.label')} ${$t('columns.time.unit')}`"
                                   md-sort-by="time">
                        <span v-if="editingTaskId !== item.id">
                            {{ item.time | date }}
                            <strong class="table-section__expired-label" v-if="isExpired(item)">{{
                                $t('columns.time.expired') }}
                            </strong>
                            <strong class="table-section__expired-label" v-if="isToday(item)">{{
                                $t('columns.time.today') }}
                            </strong>
                        </span>
                        <md-datepicker
                                v-else
                                :class="getValidationClass('time')"
                                id="time-edit" name="time"
                                v-model="form.time"
                                :disabled="sending"
                                md-immediately>
                            <label for="time-edit">Temps (échéance)</label>
                            <span class="md-error" v-if="!$v.form.time.required">
                                {{ $t('columns.time.errors.required') }}
                            </span>
                        </md-datepicker>
                    </md-table-cell>
                    <md-table-cell :md-label="$t('columns.index.label')" md-sort-by="index">
                        {{ item.index }}
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </form>
        <md-empty-state
                v-else
                md-rounded
                md-icon="add"
                :md-label="$t('empty.title')"
                :md-description="$t('empty.description')"
                class="table-section__empty"
        >
        </md-empty-state>
        <form novalidate class="md-layout" @submit.prevent="validateTask">
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
                                {{ $t('columns.importance.unit') }}
                            </label>
                            <md-select id="importance" name="importance" v-model="form.importance"
                                       :disabled="sending">
                                <md-option value="1">1</md-option>
                                <md-option value="2">2</md-option>
                                <md-option value="3">3</md-option>
                                <md-option value="4">4</md-option>
                                <md-option value="5">5</md-option>
                            </md-select>
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
                                {{ $t('columns.duration.unit') }}
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
  import {isBefore, add, isToday} from 'date-fns'

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
      editingTaskId: null,
      currentSort: 'index',
      currentSortOrder: 'desc',
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
    mounted() {
      this.$store.commit('recalculateIDT')
    },
    methods: {
      isExpired(item) {
        return isBefore(add(new Date(item.time), {days: 1}), new Date)
      },
      isToday(item) {
        return isToday(new Date(item.time));
      },
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
      editTask(item) {
        this.form.name = item.name
        this.form.importance = item.importance
        this.form.duration = item.duration
        this.form.time = new Date(item.time)
        this.editingTaskId = item.id
      },
      saveTask() {
        this.sending = true

        let payload = {
          id: this.editingTaskId,
          name: this.form.name,
          importance: this.form.importance,
          duration: this.form.duration,
          time: this.form.time
        };
        this.$store.dispatch('addTask', payload)

        this.taskSaved = true
        this.sending = false
        this.clearForm()
        this.editingTaskId = null
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

        &__today {
            background-color: rgba(red, 0.10);
        }

        &__expired {
            background-color: rgba(red, 0.25);
        }

        &__expired-label {
            color: red;
        }

        &__empty {
            margin-top: 3em;
            margin-bottom: 3em;
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
                    "unit": "(sur 5)",
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
                    "expired": "(Date dépassée)",
                    "today": "(aujourd'hui)",
                    "errors": {
                        "required": "Une date d'échéance est requise"
                    }
                },
                "index": {
                    "label": "Indice IDT"
                }
            },
            "submit": "Créer la tâche",
            "empty": {
                "title": "Aucune tâche",
                "description": "Saisie un nom, un niveau d'importance, une durée et un temps. On calcul un indice IDT qui te dira par quelle tâche commencer ;)"
            }
        }
    }
</i18n>
