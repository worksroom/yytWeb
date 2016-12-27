package com.yyt.web.erp;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONPObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.youguu.core.pojo.Response;
import com.youguu.core.util.HttpUtil;
import com.yyt.web.util.AES;

/**
 * Created by lenovo on 2016/12/26.
 */
public class ERPNotice {
    private static Log loger = LogFactory.getLog(ERPNotice.class);

    private static String url = "http://lbx.1u.com:81/api/gate/acceptuser";

    public static boolean user_regist(String param,int uid){
        try{
            if(param!=null){
                String[] params = param.split("_");
                if(params.length==3){
                    String encode = AES.encrypt(params[0] + "" + uid);
                    StringBuilder temp_url = new StringBuilder(url);
                    temp_url.append("?userid=").append(params[0]).append("&").append("partnerid=")
                            .append(uid).append("&sign=").append(encode);
                    Response<String> res =  HttpUtil.sendGet(url, null, "utf-8");
                    if("0000".equals(res.getCode())){
                        loger.info("erp return:{}",res);
                        JSONObject json = JSONObject.parseObject(res.getMsg());
                        if(json.getIntValue("status")>0){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        loger.info("erp error:{}",res);
                    }
                }else{
                    loger.info("ERPNotice param:{}",param);
                }

            }else{
                loger.info("ERPNotice param is null");
            }
        }catch(Exception e){
            loger.error(e);
        }



        return false;
    }
}
