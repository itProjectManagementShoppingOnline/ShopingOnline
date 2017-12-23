export default {

    /**
     * @param {String} api 上传数据接口
     */
    api: {
        type: String,
    },

    /**
     * @param  {String | Array} value 初始图片
     * 传入 String 类型默认为单图模式
     * 传入 Array 类型 通过 max 判定单多图
     */
    value: {
        type: String | Array,
        default: null,
    },

    /**
     * @param {Number} max 数量限制
     * 0 为不限数量
     * 1 为单图模式
     * 其他数为多图模式
     */
    max: {
        type: Number,
        default: 0,
    },

    /**
     * @param {Number} limit 图片大小限制
     * 0 为不限大小，默认为 0
     */
    limit: {
        type: Number,
        default: 0,
    },

    /**
     * @param {Boolean} disable 是否允许上传图片
     * true 为禁止上传
     * 默认为允许上传
     */
    disable: {
        type: Boolean,
        default: false
    }
}