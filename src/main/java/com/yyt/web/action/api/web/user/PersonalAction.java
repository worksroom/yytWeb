package com.yyt.web.action.api.web.user;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.order.IOrderRPCService;
import com.yyt.print.rpc.client.product.IProductRpcService;
import com.yyt.print.rpc.client.user.IUserRpcService;
import com.yyt.print.user.pojo.User;
import com.yyt.print.user.pojo.UserBuyer;
import com.yyt.print.user.pojo.UserSeller;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;
import java.util.Map;

/**
 * Created by leo on 2017/3/14.
 */
@Path("/api/web/user")
@Controller("api/web/user")
public class PersonalAction {

    Log loger = LogFactory.getLog(PersonalAction.class);

    IOrderRPCService orderRPCService = YytRpcClientFactory.getOrderRPCService();
    IUserRpcService userRpcService = YytRpcClientFactory.getUserRpcService();

    /**
     * 加载待付款，待收货，收藏的店铺，收藏的宝贝
     * @param userId
     * @return
     */
    @GET
    @Path(value = "/perfect")
    @Produces("text/json;charset=UTF-8")
    public String perfect(@HeaderParam("userId") int userId){
        JSONObject result = new JSONObject();

        userId = 1;

        Map<String,Integer> collectCountMap = orderRPCService.getCollectCount(userId);
        Map<Integer,Integer> orderCountMap = orderRPCService.getOrderCount(userId);

        JSONObject map = new JSONObject();
        if(collectCountMap.size()>0){
            map.put("shop", collectCountMap.get("shop"));//收藏的店铺
            map.put("goods", collectCountMap.get("goods"));//收藏的货品
        }

        if(orderCountMap.size()>0){
            map.put("waitPay", orderCountMap.get(0));  //待付款
            map.put("waitDelivery", orderCountMap.get(1));  //待发货
        }

        result.put("result",map);
        result.put("status","0000");
        return result.toJSONString();
    }

    @GET
    @Path(value = "/personal")
    @Produces("text/json;charset=UTF-8")
    public String personal(@HeaderParam("userId") int userId){
        JSONObject result = new JSONObject();

        userId = 1;
        User user = userRpcService.getUser(userId);
        UserBuyer userBuyer = userRpcService.getUserBuyer(userId);
        UserSeller userSeller = userRpcService.getUserSeller(userId);

        JSONObject userJson = new JSONObject();
        userJson.put("nickname", user.getNickName());
        userJson.put("headpic", "");
        userJson.put("phone", user.getPhone());

        if(userBuyer!=null){
            userJson.put("buyerName", userBuyer.getName());
        }

        if(userSeller!=null){
            userJson.put("sellerName", userSeller.getName());
        }

        result.put("result",userJson);
        result.put("status","0000");
        return result.toJSONString();
    }
}
