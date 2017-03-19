package com.yyt.web.action.api.wx;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.user.IUserRpcService;
import com.yyt.print.user.pojo.User;
import com.yyt.print.user.response.AuthResponse;
import com.yyt.web.action.api.erp.TempOpenid;
import com.yyt.web.erp.ERPNotice;
import com.yyt.web.wx.WechatMessageUtil;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.io.*;
import java.net.URLEncoder;
import java.util.Map;
import java.util.UUID;

/**
 * Created by lenovo on 2016/12/25.
 */
@Path("/api/wx")
@Controller("api/wx")
public class WxAction {
    Log loger = LogFactory.getLog(WxAction.class);

    IUserRpcService userRpcService = YytRpcClientFactory.getUserRpcService();

    @POST
    @Path(value = "/handler")
    @Produces("text/html;charset=UTF-8")
    public String handler(@QueryParam("signature") String signature,
                          @QueryParam("timestamp") String timestamp,
                          @QueryParam("nonce") String nonce,
                          @QueryParam("echostr") String echostr,
                          @Context HttpServletRequest request){
        Map<String, String> map = WechatMessageUtil.xmlToMap(request);
        String event = map.get("Event");
        loger.info("data:{}",map.toString());
        String open_id = map.get("FromUserName");
        String eventKey;
        switch (event){
            case WechatMessageUtil.MESSAGE_EVENT_SUBSCRIBE:
                //扫描二维码关注
                eventKey = map.get("EventKey");
                String param = eventKey.substring(eventKey.indexOf("_")+1);
                loger.info("param:{}",param);
                int uid = TempOpenid.isExits(open_id);
                if(uid==0){
                    uid = TempOpenid.getUid();
                    TempOpenid.addOpenid(open_id,uid);
                }
                ERPNotice.user_regist(param,uid);
                break;
            case  WechatMessageUtil.MESSAGE_EVENT_SCAN:
                //扫描二维码 已关注
                eventKey = map.get("EventKey");
                loger.info("param:{}",eventKey);
                uid = TempOpenid.isExits(open_id);
                if(uid==0){
                    uid = TempOpenid.getUid();
                    TempOpenid.addOpenid(open_id,uid);
                }
                ERPNotice.user_regist(eventKey,uid);
                break;
            default:
                break;
        }

        return "success";
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

    public final static String APPID = "wx33ced9524f7aa796";
    public final static String APPSECRET = "128d96c0f11fd8e1b5353def82027e0a";


    @GET
    @Path(value = "/login")
    @Produces("text/html;charset=UTF-8")
    public String login(@Context HttpServletResponse response) throws IOException {

        String callbackUrl = "119.253.36.116/api/wx/callback";
        System.out.println(URLEncoder.encode(callbackUrl, "UTF-8"));
        String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+APPID
                + "&redirect_uri=" + URLEncoder.encode(callbackUrl, "UTF-8")
                + "&response_type=code"
                + "&scope=snsapi_userinfo"
                + "&state="+ UUID.randomUUID()+"#wechat_redirect";
//        doGetJson(url);
//        System.out.println(authorize);
//        response.addHeader("Access-Control-Allow-Origin", "*");
        response.sendRedirect(url);

        JSONObject object = new JSONObject();
        object.put("status", "0000");
        return object.toJSONString();
    }


    @GET
    @Path(value = "/callback")
    @Produces("text/html;charset=UTF-8")
    public String callback(@Context HttpServletRequest request, @Context HttpServletResponse response) throws ServletException, IOException {
        String code = request.getParameter("code");
        String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + APPID
                + "&secret=" + APPSECRET
                + "&code=" + code
                + "&grant_type=authorization_code";

        JSONObject jsonObject = doGetJson(url);
        String openid = jsonObject.getString("openid");
        String token = jsonObject.getString("access_token");

        String infoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=" + token
                + "&openid=" + openid
                + "&lang=zh_CN";

        JSONObject userInfo = doGetJson(infoUrl);
        System.out.println(userInfo);

        //1.使用微信用户信息直接登录，无需注册和绑定
        request.setAttribute("info", userInfo);
        request.getRequestDispatcher("/home.html").forward(request, response);

        return null;
    }


    public static JSONObject doGetJson(String url) {
        try{
            JSONObject jsonObject = null;
            DefaultHttpClient client = new DefaultHttpClient();
            HttpGet httpGet = new HttpGet(url);
            HttpResponse response = client.execute(httpGet);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                String result = EntityUtils.toString(entity, "UTF-8");
                jsonObject = JSONObject.parseObject(result);
            }
            //释放连接
            httpGet.releaseConnection();
            return jsonObject;
        } catch (Exception e){

        }
        return null;

    }


    @POST
    @Path(value = "/account_login")
    @Produces("text/json;charset=UTF-8")
    public String accountLogin(@FormParam("username") String username,
                               @FormParam("password") String password) throws IOException {

        JSONObject object = new JSONObject();

        AuthResponse response = userRpcService.login(username, password, User.REGIST_GENERAL, null);

        object.put("status", "0000");
        object.put("userid", response.getUserId());
        object.put("sessionid", response.getSession());

        return object.toJSONString();
    }
}
