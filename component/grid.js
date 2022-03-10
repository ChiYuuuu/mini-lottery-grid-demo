const app = getApp()
let i = 0,
    count = 0, //转圈初始值
    speed = 300, //转圈速度，越大越慢
    timer;
const minSpeed = 60 // 最快速度
Component({
    properties: {
        /**
         * 奖品信息
         * 示例 : 
         * [{id:'1',name:'电脑',......}]
         */
        prizeInfo: {
            type: Array,
            value: '',
        },
        // 中奖id 由接口返回
        winPrizeId: {
            type: String,
            value: '',
        },
        // 转圈次数默认3圈
        totalCount: {
            type: Number,
            value: 4
        },
        // 接口请求错误或者超时的情况
        isApiError: {
            type: Boolean,
            value: false
        }
    },
    data: {
        rollPrizeId: null, // 转动id
        isRoll: true // 是否能点击抽奖
    },
    methods: {
        /**
         * 重置参数
         */
        _reset() {
            speed = 300
            count = 0
        },
        /**
         * 点击抽奖
         */
        _start() {
            if (this.data.isRoll) {
                this.data.isRoll = false
                this._roll()
                this._reset()

            } else {
                wx.showToast({
                    title: '重复点击!',
                    icon: 'none'
                })
            }
        },
        /**
         * 滚动
         */
        _roll() {
            // 加快速度
            speed -= 50;

            if (speed <= minSpeed) {
                speed = minSpeed; //最快速度
            }

            /**
             * 滚动顺序 顺时针
             * 0 1 2
             * 3   4
             * 5 6 7
             */
            let orderArr = [0, 1, 2, 4, 7, 6, 5, 3]
            this.setData({
                rollPrizeId: orderArr[i]
            })


            i++;

            //计算转圈次数
            if (i >= 8) {
                i = 0;
                count++;
            }



            // 获取 中奖id 在滚动中的实际位置
            let prizeIndex = this.data.prizeInfo.findIndex(item => item.id == this.data.winPrizeId)
            let actualIndex = orderArr.findIndex(item => item == prizeIndex)
            console.log(actualIndex);
            if (count >= this.data.totalCount && (i - 1) == actualIndex && actualIndex != -1) {
                clearTimeout(timer);
                this.data.isRoll = true
            } else {
                // 接口是否错误
                if (this.data.isApiError) {
                    clearTimeout(timer);
                    this.data.isRoll = true
                    this.setData({
                        rollPrizeId: null
                    })
                    wx.showToast({
                        title: '请求错误!',
                        icon: 'error'
                    })
                    return
                }
                timer = setTimeout(() => this._roll(), speed);
                // 接口成功返回数据
                if (actualIndex != -1) {
                    // 减慢速度 this.data.totalCount - 1 提前一圈减速
                    if (count >= this.data.totalCount - 1 || speed <= 50) {
                        speed += 80;
                    }
                }

            }
        }
    }


})