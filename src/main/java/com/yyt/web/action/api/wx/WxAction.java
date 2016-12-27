package com.yyt.web.action.api.wx;

import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.web.erp.ERPNotice;
import com.yyt.web.wx.WechatMessageUtil;
import org.springframework.stereotype.Controller;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;

/**
 * Created by lenovo on 2016/12/25.
 */
@Path("/api/wx")
@Controller("api/wx")
public class WxAction {
    Log loger = LogFactory.getLog(WxAction.class);


    @POST
    @Path(value = "/handler")
    @Produces("text/html;charset=UTF-8")
    public String handler(@QueryParam("signature") String signature,
                          @QueryParam("timestamp") String timestamp,
                          @QueryParam("nonce") String nonce,
                          @QueryParam("echostr") String echostr,
                          @QueryParam("openid") String openid,
                          @Context HttpServletRequest request){
        Map<String, String> map = WechatMessageUtil.xmlToMap(request);
        String event = map.get("Event");
        String eventKey;
        switch (event){
            case WechatMessageUtil.MESSAGE_EVENT_SUBSCRIBE:
                //扫描二维码关注
                eventKey = map.get("EventKey");
                String param = eventKey.substring(eventKey.indexOf("_")+1);
                loger.info("param:{}",param);
                ERPNotice.user_regist(param,224);
                break;
            case  WechatMessageUtil.MESSAGE_EVENT_SCAN:
                //扫描二维码 已关注
                eventKey = map.get("EventKey");
                loger.info("param:{}",eventKey);
                ERPNotice.user_regist(eventKey,224);
                break;
            default:
                break;
        }

        return "";
    }


    @GET
    @Path(value = "/handler")
    @Produces("text/html;charset=UTF-8")
    public String handler(@QueryParam("signature") String signature,
                          @QueryParam("timestamp") String timestamp,
                          @QueryParam("nonce") String nonce,
                          @QueryParam("echostr") String echostr){
        if(echostr!=null) return echostr;
        return "";
    }

}
