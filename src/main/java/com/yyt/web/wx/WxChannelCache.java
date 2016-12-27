package com.yyt.web.wx;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by lenovo on 2016/12/25.
 */
public class WxChannelCache {
    public final static String APPID = "wx33ced9524f7aa796";

    //wxbe5a13b7459582d0 , 54faccfe1fa3aa67b4855d235003f360

    private static Map<String,WxChannel> map = new ConcurrentHashMap<>();

    /**
     * 先不支持多个appid 默认写死
     * @return
     */
    public static WxChannel getWxChannel(){
        WxChannel channel = map.get(APPID);
        if(channel!=null){
            return channel;
        }
        synchronized (WxChannelCache.class){
            channel = map.get(APPID);
            if(channel==null){
                channel = new WxChannel("wx33ced9524f7aa796","128d96c0f11fd8e1b5353def82027e0a");
                map.put(APPID,channel);
            }
        }
        return channel;
    }


}
