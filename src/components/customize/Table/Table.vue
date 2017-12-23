<template>
  <div class="zeus-table">
    <table ref="table">
      <!-- 表头 -->
      <thead class="unselectable">
        <tr>
          <th v-for="(column, index) in cols" :key="index">
            <div class="flex-head">
              {{column.label}}
              <!-- 排序图标 -->
              <template v-if="column.sortable">
                <i v-if="sortIndex == index && sortType == 1" class="material-icons icon-btn" @click="sortCol(index)">keyboard_arrow_down</i>
                <i v-else-if="sortIndex == index && sortType == -1" class="material-icons icon-btn" @click="sortCol(index)">keyboard_arrow_up</i>
                <i v-else class="material-icons icon-btn" @click="sortCol(index)">swap_vert</i>
              </template>
              <!-- 筛选图标 -->
              <template v-if="column.filters">
                <i :ref="`filter${index}`" class="material-icons icon-btn" @click.stop="openFilter(index)">filter_list</i>
              </template>
            </div>
          </th>
        </tr>

        <div ref="filterBox" class="filter-box" v-if="filterState">
          <ul v-if="filterType === 'multi'">
            <li class="filter-list-item" v-for="filter in filterData" :key="filter.value" @click="selectFilter(filter.value)">
              <span class="primary-content">
                {{filter.label}}
              </span>
              <span>
                <i v-if="filterChecked.find(p => p === filter.value)" class="material-icons icon-btn checked-box">check_box</i> 
                <i v-else class="material-icons icon-btn checkbox-outline">check_box_outline_blank</i> 
              </span>
            </li>
            <div class="action-box">
              <button class="action-box-item filter-list-item mdl-button" :disabled="JSON.stringify(filterChecked) == JSON.stringify(filterPrev)" @click="commitMultiFilter">筛选</button>
              <button class="action-box-item filter-list-item mdl-button" @click="clearMultiFilter">重置</button>
            </div>
          </ul>
          <ul v-else>
            <li class="filter-list-item" v-for="filter in filterData" :key="filter.value"
              @click="commitFilter(filter.value)">
              {{filter.label}}
            </li>
          </ul>
        </div>
      </thead>

      <tbody v-if="rows">
        <tr v-for="(row, rIndex) in rows" :key="'r' + rIndex">
          <td v-for="(column, cIndex) in cols" :key="'c' + cIndex">
            <div style="display: flex;flex-direction: column;align-items: flex-start;" v-if="column.type === 'button'">
              <button
                v-for="btn in collect(row, column.field)" :key="btn.value"
                class="mdl-button" :class="{'colored':btn.colored,'raised':btn.raised}"
                style="margin-bottom:5px;"
                :disabled="btn.disable" :style="`color:${btn.color};background-color:${btn.backgroundColor}`"
                @click="commitAction(row, btn.value)">
                {{btn.label}}
              </button>
            </div>
            <template v-else>
              {{ collect(row, column.field) }}
            </template>
          </td>
        </tr>
      </tbody>

      <template v-else>
        <slot name="tbody"></slot>
      </template>
    </table>
  </div>
</template>

<script>
import props from './props';
import utils from './lib/utils';
require('./style/style.scss');

const TRANSITION_TIME = 160;

export default {
  data() {
    return {
      sortIndex: -1,
      sortType: 0,
      filterState: false,
      filterIndex: -1,
      filterData: [],
      filterType: '',
      filterChecked: [],
      filterPrev: [],
    }
  },
  props: props,
  methods: {

    sortCol(index) {

      let sortType = this.sortType;
      let sortIndex = this.sortIndex;

      if (!this.cols[index].sortable) {
        return;
      }
      
      if (sortIndex == index) {
        switch(sortType) {
          case 0: sortType = 1; break;
          case 1: sortType = -1; break;
          case -1: sortType = 0; this.sortIndex = -1; break;
        }
        this.sortType = sortType;
      } else {
        this.sortIndex = index;
        this.sortType = 1;
      }

      this.$emit('sort', this.cols[index], this.sortType);
    },

    closeFilter() {

      let filterBox = this.$refs.filterBox
      filterBox.style.opacity = 0;

      document.onclick = function() {};

      setTimeout(() => {
        this.filterState = false;
        this.filterIndex = -1;
        this.filterData = [];
        this.filterType = '';
      }, TRANSITION_TIME);
    },

    openFilter(index) {
      const self = this;

      if (index === this.filterIndex) {
        this.closeFilter();
        return;
      }

      this.filterIndex = index;

      let setFilterBox = new Promise((resolve, reject) => {
        let col = this.cols[index];
        this.filterState = true;
        this.filterType = col.filterType;
        this.filterData = col.filters;
        resolve();
      })

      setFilterBox.then(() => {
        let filter = this.$refs[`filter${index}`][0];
        let filterParent = filter.offsetParent;

        let filterBox = this.$refs.filterBox;
        filterBox.style.left = filter.offsetLeft + filterParent.offsetLeft + 'px';
        filterBox.style.transition = `all ${TRANSITION_TIME / 1000}s`;
        filterBox.style.opacity = 1;
        // this.filterData = this.cols[index].filters;

        const clickEvent = e => {
          let flag = e.path.find(p => p === filterBox);
          if (!flag) {
            this.closeFilter();
          }
        }

        document.onclick = clickEvent;
      })

    },

    commitFilter(value) {
      let obj = this.cols[this.filterIndex];
      this.$emit('filter', obj, value);
      this.closeFilter();
    },

    selectFilter (value) {
      let index = 0;
      for (;index < this.filterChecked.length; index ++) {
        if (this.filterChecked[index] === value) {
          break;
        }
      }
      if (index < this.filterChecked.length) {
        this.filterChecked.splice(index, 1);
      } else {
        this.filterChecked.push(value);
      }
    },

    commitMultiFilter() {
      this.filterPrev = JSON.parse(JSON.stringify(this.filterChecked));
      this.commitFilter(this.filterChecked);
    },

    clearMultiFilter() {
      this.filterChecked.length = 0;
      this.commitMultiFilter();
    },

    commitAction(obj, value) {
      this.$emit('actions', obj, value);
    },

    /**
     * @function dig {通过字符串描述获取对象值}
     * @param  {Object} obj       {待获取值的对象}
     * @param  {String} selector  {描述}
     * @return {type} {获取的值}
     */
    dig(obj, selector) {
      let result = obj;
      const splitter = selector.split('.');
      // TODO: 兼容 [''] 模式
      for (let i = 0; i < splitter.length; i++) {
        if (result == undefined) {
          return undefined;
        }

        result = result[splitter[i]];
      }

      return result;
    },

    collect(obj, field) {
      if (typeof(field) === 'function') {
        return field(obj);
      } else if (typeof(field) === 'string') {
        return this.dig(obj, field);
      } else {
        return undefined;
      }
    },

  },
}
</script>
