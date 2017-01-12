package com.yyt.web.action.api.erp;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.web.action.api.erp.msg.SendMsg;
import com.yyt.web.util.AES;
import com.yyt.web.wx.WxChannel;
import com.yyt.web.wx.WxChannelCache;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;

/**
 * Created by lenovo on 2016/12/25.
 */
@Path("/api/erp")
@Controller("api/erp")
public class ErpApiAction {

    Log loger = LogFactory.getLog(ErpApiAction.class);

    @GET
//    @POST
    @Path(value = "/getqr")
    @Produces("text/html;charset=UTF-8")
    public String getQr(@QueryParam("id") String id ,
                        @QueryParam("phone")  String phone,
                        @QueryParam("orgid") String orgid,
                        @QueryParam("callback") String callback,
                        @QueryParam("sign") String sign){

        StringBuilder sb = new StringBuilder("");
        sb.append(id).append(phone).append(orgid);
        loger.info("sb:{}",sb.toString());
        String encode = AES.encrypt(sb.toString());
        loger.info("encode:{}",encode);


        JSONObject json = new JSONObject();
        if(false){//(!encode.equals(sign)){
            json.put("status",-1);
            json.put("msg","数据校对错误");
        }else{
            json.put("status","-2");
            json.put("msg","异常,稍后再试");
            String param = id+"_"+phone + "_" + orgid;
            WxChannel channel = WxChannelCache.getWxChannel();
            JSONObject wx_result = channel.imgTicket(param);
            loger.info("getQr:{}",wx_result.toJSONString());
            if(wx_result.containsKey("ticket")){
                json.put("status",1);
                json.put("msg","ok");
                json.put("url","https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+wx_result.getString("ticket"));
            }
        }
        return json.toJSONString();
    }

    /**
     * 订单消息
     * @return
     */
    @POST
    @Path(value = "/ordermsg")
    @Produces("text/html;charset=UTF-8")
    public String orderMsg(@FormParam("type") int type,
                           @FormParam("money") String money,
                           @FormParam("data") String data,
                           @FormParam("sign") String sign,
                           @FormParam("uid") int uid){
        JSONObject json = new JSONObject();
        loger.info("type:{}",type);
        loger.info("money:{}",money);
        loger.info("data:{}",data);
        loger.info("uid:{}",uid);
        loger.info("sign:{}",sign);
        json.put("status",0);
        json.put("msg","发送成功");
        JSONObject msg = JSON.parseObject(data);
        switch (type){
            case 0:
                String openId = TempOpenid.getOpenid(uid);
                if(openId==null){
                    json.put("status",-1);
                    json.put("msg","用户不存在");
                }else{
                    SendMsg.sendConfirmOrder(openId, msg);
                }
                break;
            case 1:
                openId = TempOpenid.getOpenid(uid);
                if(openId==null){
                    json.put("status",-1);
                    json.put("msg","用户不存在");
                }else{
                    SendMsg.sendOrderStatus(openId,msg);
                }
                break;
            default:
                json.put("status",-1);
                json.put("msg","不支持的type");
                break;
        }


        return json.toJSONString();
    }


    @GET
    @Path(value = "/test")
    @Produces("text/html;charset=UTF-8")
    public String getTest(){
        return "1234";
    }

}
