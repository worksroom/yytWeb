package com.yyt.web.action.api.erp;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
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
        for(int i=0;i<10;i++){
            encode = AES.encrypt(sb.toString());
            loger.info("encode:{}",encode);
        }

        JSONObject json = new JSONObject();
        if(!encode.equals(sign)){
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


    @GET
    @Path(value = "/test")
    @Produces("text/html;charset=UTF-8")
    public String getTest(){
        return "1234";
    }

}
