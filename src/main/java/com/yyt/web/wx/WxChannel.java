package com.yyt.web.wx;



import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;

import java.util.*;

/**
 * 
 */
public class WxChannel {

    Log logger = LogFactory.getLog(WxChannel.class);

    public WxChannel(String appid,String appSecret){
        this.appId = appid;
        this.appSecret = appSecret;
    }

    private String appId;

    private String appSecret;

    /***初始化变量值***/
    //获取access_token
    private String grant_type = "client_credential";

    /**
     * 获取token的url
     */
    private String tokenUrl = "https://api.weixin.qq.com/cgi-bin/token";

    /**
     * 获取jsapi接口
     */
    private String jsapiUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket";


    /**
     * 通过CODE 拉toKen
     */
    private String getUserTokenUrl = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";
    private String getUserUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=zh_CN";


    private String imgTicket_url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=";

    /**
     * token
     */
    public  String access_token;

    /**
     * jsapi
     */
    private  String jsapi_ticket;

    private  long lasttime  = 0 ;

    /**
     * 应用唯一id  老APPID 保留备份
     */

    public String getAppId() {
        return appId;
    }

    /**
     * 应用秘钥   老secret 保留备份
     * @param flag 0 正常获取 会根据缓存判断   1 强制刷新
     */

    public String getToken(int flag){
        if(this.access_token!=null && flag ==0 ) return this.access_token;
        synchronized (this){
            if(this.access_token==null){
                StringBuffer sb = new StringBuffer(this.tokenUrl);
                sb.append("?")
                        .append("grant_type").append("=").append(grant_type).append("&")
                        .append("appid").append("=").append(appId).append("&")
                        .append("secret").append("=").append(appSecret);
                String response =  HttpsClient.getClient().doGet(sb.toString());
                String access_token_new = null;
                if(response!=null){
                    access_token_new = JSONObject.parseObject(response).getString("access_token");
                    this.access_token = access_token_new;
                }
            }
        }

        return this.access_token;
    }

    private JSONObject wx_imgTicket(String param){
        int expire_seconds = 2592000;
        String action_name = "QR_LIMIT_STR_SCENE";
        JSONObject json = new JSONObject();
        json.put("expire_seconds",expire_seconds);
        json.put("action_name",action_name);
        JSONObject action_info = new JSONObject();
        JSONObject scene = new JSONObject();
        scene.put("scene_str",param);
        action_info.put("scene",scene);
        json.put("action_info",action_info);

        String url = this.imgTicket_url + this.access_token ;

        String result = HttpsClient.getClient().doPost(url, json.toJSONString());

        JSONObject wx_result;

        try{
            wx_result = JSONObject.parseObject(result);

        }catch (Exception e){
            wx_result = new JSONObject();
            wx_result.put("errcode",-1);
        }

        return wx_result;
    }

    //获取带参数的临时二维码
    public JSONObject imgTicket(String param){

        this.getToken(0);
        JSONObject wx_result;

        try{
            wx_result = wx_imgTicket(param);
            int errcode = wx_result.getIntValue("errcode");
            if(errcode==42001){
                this.getToken(1);
                wx_result = wx_imgTicket(param);
            }
        }catch (Exception e){
            wx_result = new JSONObject();
            wx_result.put("errcode",-1);
        }

        return wx_result;
    }


    public String getJsapiPath(String access_token){
        StringBuilder sb = new StringBuilder(this.jsapiUrl);
        sb.append("?")
                .append("access_token").append("=").append(this.access_token).append("&")
                .append("type").append("=").append("jsapi");
        return sb.toString();
    }

    public String getJsapi(){

        if(System.currentTimeMillis() - lasttime < 1*60*60*1000 && jsapi_ticket!=null){
            return jsapi_ticket;
        }

        try{
            this.getToken(0);
            String response =  HttpsClient.getClient().doGet(getJsapiPath(this.access_token));
            logger.info(response);
            if(response!=null){
                JSONObject json= JSONObject.parseObject(response);
                int errcode = json.getIntValue("errcode");
                if(0 == errcode){
                    jsapi_ticket = json.getString("ticket");
                }else if(40001 == errcode || 42001 == errcode){ // access_token 过期，重新获取
                    this.getToken(1);
                    response =  HttpsClient.getClient().doGet(getJsapiPath(this.access_token));
                    logger.info(response);
                    json= JSONObject.parseObject(response);
                    errcode = json.getIntValue("errcode");
                    if(0 == errcode){
                        jsapi_ticket = json.getString("ticket");
                    }else{
                        jsapi_ticket = null;
                    }
                }else{
                    jsapi_ticket = null;
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }

        lasttime = System.currentTimeMillis();
        return jsapi_ticket;
    }

    /**
     * 生成签名
     * @param
     * @return
     */
    public String signature(Map<String, String> params){

        StringBuffer sb = new StringBuffer("");
        Set<Map.Entry<String, String>> es = params.entrySet();
        Iterator<Map.Entry<String, String>> it = es.iterator();
        while(it.hasNext()) {
            Map.Entry<String, String> entry = it.next();
            String k = entry.getKey();
            String v = entry.getValue();
            sb.append(k).append("=").append(v).append("&");
        }

        String param = sb.substring(0, sb.lastIndexOf("&"));
        String appsign = Sha1Util.getSha1(param);
        return appsign;
    }

    public String getUser(String code, String scope) {
        String response =  HttpsClient.getClient().doGet(String.format(getUserTokenUrl, appId, appSecret, code));
        if(response!=null && !"snsapi_base".equals(scope)) {
            JSONObject json = JSONObject.parseObject(response);
            if(json.containsKey("errcode")) {
                int errcode = json.getIntValue("errcode");
                if (errcode == 40029) {
                    //CODE无效
                    throw new WeiXinException("CODE无效");
                }
            }
            String openid = json.getString("openid");
            String token = json.getString("access_token");
            response = HttpsClient.getClient().doGet(String.format(getUserUrl, token, openid));
        }
        return response;
    }

    public static  String getnoncestr(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
    public static void main(String[] args){
//        WxChannel channel = WxChannelCache.getWxChannel();
//        System.out.println(channel.imgTicket("1234"));
        String value ="1_3";
        System.out.println(value.split("_")[1]);

    }
}
