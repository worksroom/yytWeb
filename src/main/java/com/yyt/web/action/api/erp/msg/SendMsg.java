package com.yyt.web.action.api.erp.msg;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.web.wx.WxChannel;
import com.yyt.web.wx.WxChannelCache;

/**
 * Created by lenovo on 2017/1/12.
 */
public class SendMsg {
    static Log logger = LogFactory.getLog(SendMsg.class);

    /**
     * 发送确认订单
     * 模板id:7JhDAn0RlKlrDjowAvKjIWYKWXdD796U1RzYMgIYyPk
     *  {{first.DATA}}
        订单号：{{keyword1.DATA}}
        支付金额：{{keyword2.DATA}}
        支付方式：{{keyword3.DATA}}
        {{remark.DATA}}

     * @param msg {
                    “order”: 订单号,
                    "des": 描述,
                    "url": 地址，
                    "money": 金额
                    }

     * @return
     */
    public static boolean sendConfirmOrder(String openid,JSONObject msg ){

        JSONObject json = new JSONObject();




        JSONObject data = new JSONObject();
        data.put("value",msg.getString("des"));
        data.put("color","#173177");
        json.put("first",data);

        data = new JSONObject();
        data.put("value",msg.getString("order"));
        data.put("color","#173177");
        json.put("keyword1",data);

        data = new JSONObject();
        data.put("value",msg.getString("money"));
        data.put("color","#173177");
        json.put("keyword2",data);


        data = new JSONObject();
        data.put("value","--");
        data.put("color","#173177");
        json.put("keyword3",data);


        data = new JSONObject();
        data.put("value","查看订单详情");
        data.put("color","#173177");
        json.put("remark",data);

        WxChannel channel = WxChannelCache.getWxChannel();
        JSONObject wx_result = channel.wxSendMsg(openid, "7JhDAn0RlKlrDjowAvKjIWYKWXdD796U1RzYMgIYyPk", msg.getString("url"), json);
        int errcode = wx_result.getIntValue("errcode");
        if(errcode==0){
            return true;
        }else{
            logger.info("确认订单错误:{}",wx_result.toJSONString());
            return false;
        }

    }


    /**
     * 发送确认订单
     * 模板id:E9dKO1aiLGTuRWQ86YxrB8vsqEX06oIxLlZBXTrlA5A
     *  {{first.DATA}}
        订单编号：{{keyword1.DATA}}
        更新时间：{{keyword2.DATA}}
        {{remark.DATA}}
     * @return
     */
    public static boolean sendOrderStatus(String openid,JSONObject msg ){

        JSONObject json = new JSONObject();




        JSONObject data = new JSONObject();
        data.put("value",msg.getString("status_des"));
        data.put("color","#173177");
        json.put("first",data);

        data = new JSONObject();
        data.put("value",msg.getString("order"));
        data.put("color","#173177");
        json.put("keyword1",data);

        data = new JSONObject();
        data.put("value",msg.getString("date"));
        data.put("color","#173177");
        json.put("keyword2",data);

        data = new JSONObject();
        data.put("value",msg.getString("des"));
        data.put("color","#173177");
        json.put("remark",data);

        WxChannel channel = WxChannelCache.getWxChannel();
        JSONObject wx_result = channel.wxSendMsg(openid, "E9dKO1aiLGTuRWQ86YxrB8vsqEX06oIxLlZBXTrlA5A", msg.getString("url"), json);
        int errcode = wx_result.getIntValue("errcode");
        if(errcode==0){
            return true;
        }else{
            logger.info("订单状态变化通知错误:{}",wx_result.toJSONString());
            return false;
        }

    }

    public static void main(String[] args) {

    }

}
