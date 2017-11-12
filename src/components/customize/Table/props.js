export default {

    /**
     * [{
     *     title:       // 对应row的标题
     *     field:       // 对应row的key
     *     sortable:    // 是否可排序
     *     filterType:  // 筛选类型
     *     filters:     // 筛选信息
     * }]
     */
    cols: {
        type: Array,
    },

    /**
     * [
     *   {
     *     field: value,
     *   }
     * ]
     */
    rows: {
        type: Array,
    }
}