package com.yyt.web.action.api.web.user;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.order.IOrderRPCService;
import com.yyt.print.rpc.client.product.IProductRpcService;
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

    IProductRpcService productRpcService = YytRpcClientFactory.getProductRpcService();
    IOrderRPCService orderRPCService = YytRpcClientFactory.getOrderRPCService();

    @GET
    @Path(value = "/perfect")
    @Produces("text/json;charset=UTF-8")
    public String perfect(@QueryParam("userId") int userId){
        JSONObject result = new JSONObject();

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
}
