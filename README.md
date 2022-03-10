# mini-lottery-grid-demo
小程序九宫格抽奖demo

![1](https://user-images.githubusercontent.com/39797843/157629310-796c09aa-f86c-44bb-ba84-794ccd3504cf.gif)

调用组件
```hxml
<lottery-grid prizeInfo="{{prizeInfo}}" isApiError="{{false}}" totalCount="4" winPrizeId="{{winPrizeId}}"></lottery-grid>
```


- prizeInfo :奖项信息 
- isApiError: 接口是否请求错误
- totalCount: 转动圈数
- winPrizeId: 中奖的奖项id

自定义样式

在组件中直接修改

```html
<view class="lottery-grid-content">
<block wx:for="{{prizeInfo}}" wx:key="id">
        <view class="item" wx:if="{{index==4}}" bindtap="_start">开始</view>
        <view class="item {{rollPrizeId==index?'active':''}}"> {{item.name}} </view>
    </block>
</view>
```
