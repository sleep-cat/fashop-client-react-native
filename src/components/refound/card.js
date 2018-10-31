import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import PropTypes from "prop-types";

export default class Index extends Component {
    static refundInfo = {
        refundInfo: PropTypes.object,
    };
    static defaultProps = {
        refundInfo: null,
    };

    onClick(e) {
        const refundInfo = this.state.refundInfo
        this.triggerEvent('click', { refundInfo });
    }
    render(){
        return <View className="refund-card">
            <View className="header" bind:click="onClick">
                <refund-goods-card
                    goodsTitle="{{refundInfo.goods_title}}"
                    goodsImg="{{refundInfo.goods_img}}"
                    goodsSpec="{{refundInfo.goods_spec_string}}"
                    goodsNum="{{refundInfo.goods_num}}"
                ></refund-goods-card>
            </View>

            <View className="body" bind:click="onClick">
                <!--平台处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货)-->
                <!--申请类型:1为仅退款,2为退货退款,默认为1-->
                <View className="icon">
                    <block wx:if="{{refundInfo.handle_state === 30 || refundInfo.handle_state === 51}}">
                        <image src="/themes/default/refund/refund-success.png" mode="aspectFill" alt="¥" />
                    </block>
                    <block wx:else>
                        <image src="/themes/default/refund/refund-ing.png" mode="aspectFill" alt="退" />
                    </block>
                </View>
                <text>{{ refundInfo.refund_type === 1 ? '仅退款' : '退货退款'}}</text>
                <block wx:if="{{refundInfo.handle_state === 30 }}">
                    <label>退款完成</label>
                </block>
                <block wx:if="{{refundInfo.handle_state === 50 }}">
                    <label>已撤销退款申请</label>
                </block>
                <block wx:if="{{refundInfo.handle_state === 51 }}">
                    <label>确认收货，自动关闭退款申请</label>
                </block>
                <block wx:if="{{refundInfo.is_close === 1 }}">
                    <label>退款关闭</label>
                </block>

                <block
                    wx:if="{{refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0 }}">
                    <label>待买家发货 还剩
                        <common-static-countdown countdown="{{refundInfo.send_expiry_seconds}}"
                                                 format="dd天hh时mm分"></common-static-countdown>
                    </label>
                </block>

                <block wx:if="{{refundInfo.is_close===0 && refundInfo.handle_state === 0 }}">
                    <label>退款待处理 还剩
                        <common-static-countdown countdown="{{refundInfo.handle_expiry_seconds}}"
                                                 format="dd天hh时mm分"></common-static-countdown>
                    </label>
                </block>
            </View>
            <View className="footer">
                <order-button text="查看详情" bind:click="onClick"></order-button>
            </View>
        </View>

    }
}
