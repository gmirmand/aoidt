<template>
    <div class="todo-tasks-section">
        <md-steppers :md-active-step.sync="active" md-vertical md-linear>`
            <md-step id="first" :md-label="tasks[0].name" :md-description="`IDT: ${tasks[0].index}`"
                     :md-editable="false"
                     :md-done.sync="first">
                <md-button class="md-raised md-primary" @click="setDone('first', 'second', tasks[0].id)">
                    {{ $t('done') }}
                </md-button>
            </md-step>

            <md-step v-if="tasks[1]" id="second" :md-label="tasks[1].name" :md-description="`IDT: ${tasks[1].index}`"
                     :md-editable="false"
                     :md-done.sync="second">
                <md-button class="md-raised md-primary" @click="setDone('second', 'third', tasks[1].id)">
                    {{ $t('done') }}
                </md-button>
            </md-step>

            <md-step v-if="tasks[2]" id="third" :md-label="tasks[2].name" :md-description="`IDT: ${tasks[2].index}`"
                     :md-editable="false" :md-done.sync="third">
                <md-button class="md-raised md-primary" @click="setDone('third', null, tasks[2].id)">
                    {{ $t('done') }}
                </md-button>
            </md-step>
        </md-steppers>
    </div>
</template>

<script>
  export default {
    name: "todoTasksSection",
    computed: {
      tasks() {
        return this.$store.getters.getTasksByIDT;
      }
    },
    data: () => ({
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null
    }),
    methods: {
      setDone(id, index, taskId) {
        this.$store.dispatch('editTask', {
          id: taskId,
          attr: 'duration',
          value: 0
        })

        this[id] = true

        this.secondStepError = null

        if (index) {
          this.active = index
        }
      },
    }
  }
</script>

<style scoped lang="scss">
    .todo-tasks-section {
        text-align: left;
    }
</style>

<i18n>
    {
        "fr": {
            "done": "C'est fait !"
        }
    }
</i18n>
