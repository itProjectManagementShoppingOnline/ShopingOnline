const COLUMNS = [
    {
        label: '商品名字',
        field: 'prodName',
        sortable: true,
    }, {
        label: '归属商城',
        field: 'shop',
        filters: [
            {
                label: '网易制造',
                value: 1,
            }, {
                label: '严选',
                value: 2
            }, {
                label: '考拉',
                value: 3
            }
        ],
        filterType: 'multi' // multi, normal
    }, {
        label: '商品类型',
        field: 'type',
        filters: [
            {
                label: '寄售',
                value: 1,
            }, {
                label: '非寄售',
                value: 2
            }
        ],
        filterType: 'normal' // multi, normal
    }, {
        label: '商品状态',
        field: 'state',
        filters: [
            {
                label: '已发货',
                value: 1,
            }, {
                label: '待发货',
                value: 2
            }, {
                label: '待处理',
                value: 3
            }
        ],
        filterType: 'normal' // multi, normal
    }, {
        label: '更新时间',
        field: 'time',
        sortable: true,
    }, {
        label: '操作',
        field: 'act',
        type: 'button'
    }
];

const ROWS = [
    {
        id: 1,
        prodName: 'Zero',
        shop: '网易制造',
        type: '非寄售',
        state: '已发货',
        time: new Date(),
        act: [{
            label: '去处理', 
            value: 'handle',
            colored: true,
            raised: true
        }],
    }, {
        id: 2,
        prodName: 'Chitty',
        shop: '严选',
        type: '非寄售',
        state: '已发货',
        time: new Date(),
        act: [{
            label: '去处理', 
            value: 'handle',
            colored: true,
            raised: true,
            disable: true,
        }],
    }, {
        id: 3,
        prodName: 'One',
        shop: '考拉',
        type: '非寄售',
        state: '已发货',
        time: new Date(),
        act: [{
            label: '去处理', 
            value: 'handle',
            colored: true,
            raised: true
        }],
    }
];

module.exports = {
    COLUMNS,
    ROWS,
}