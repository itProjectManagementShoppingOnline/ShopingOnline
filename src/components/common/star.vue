<template>
  <div class="star">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index">
      <i v-if="itemClass=='on'" class="material-icons u-icons ">star</i>
      <i v-if="itemClass=='half'" class="material-icons u-icons ">star_half</i>
      <i v-if="itemClass=='off'" class="material-icons u-icons ">star_border</i>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    props: {
      score: {
        type: Number,
      },
      date() {
        return {
          score: this.score,
        };
      },
    },
    computed: {
      itemClasses() {
        const result = [];
        const fullStarNum = Math.floor(this.score * 2) / 2;
        const hasDecimal = fullStarNum % 1 !== 0;
        const integer = Math.floor(fullStarNum);
        for (let i = 0; i < integer; i += 1) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      },
    },
  };
</script>


<style lang="scss" scoped>

  .u-icons {
    font-size: 16px;
    color: orange;
  }

  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

</style>
