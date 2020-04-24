<template>
    <md-card class="info-card md-layout-item md-size-20">
        <md-card-header>
            <div class="md-title">
                <slot name="title"></slot>
            </div>
        </md-card-header>

        <md-card-content>
            {{ value}}
        </md-card-content>
    </md-card>
</template>

<script>
  export default {
    name: "InfoCard",
    props: {
      value: {
        type: Number,
        default: 0
      },
    },
  }
</script>

<style scoped lang="scss">
    .info-card {
        margin: 0;
    }
</style>
