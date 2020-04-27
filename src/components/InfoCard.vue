<template>
    <md-card class="info-card md-layout-item md-xsmall-size-50 md-small-size-33 md-size-20 md-primary">
        <md-tooltip md-direction="bottom">
            <slot name="tooltip-title"></slot>
        </md-tooltip>
        <md-card-header>
            <div class="info-card__title md-title">
                <slot name="title"></slot>
            </div>
        </md-card-header>

        <md-card-content>
            <div class="info-card__value">
                {{ value}}
            </div>
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
    // Breakpoints
    @import "src/assets/sass/breakpoints";
    @import "~breakpoint-sass/stylesheets/breakpoint";

    .info-card {
        $base: &;
        margin-bottom: 1em;

        &.md-card {
            margin-right: 0;
            margin-left: 0;

            #{$base} {
                &__title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25em;
                    line-height: 1.5;
                    height: 3em;

                    @include breakpoint($breakpoint-xl) {
                        font-size: 1.5em;
                    }
                }
            }
        }

        &__value {
            font-size: 2em;
            font-weight: bold;
        }
    }
</style>
