package com.yyt.web.action.api.erp;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by lenovo on 2017/1/12.
 */
public class TempOpenid {
    private static int uid = 1;
    static Map<String,Integer> openid_map = new ConcurrentHashMap<>();
    static Map<Integer,String> uid_map = new ConcurrentHashMap<>();

     public static void addOpenid(String openId,int uid){
         openid_map.put(openId,uid);
         uid_map.put(uid,openId);
     }

    public synchronized static int getUid(){
        return uid++;
    }

    public static int isExits(String open_id){
        Integer uid = openid_map.get(open_id);
        if(uid==null){
            return 0;
        }else{
            return uid.intValue();
        }
    }

    public static String  getOpenid(int uid){
        return uid_map.get(uid);
    }

}
