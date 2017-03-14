package com.yyt.web.action.api.web.order;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.order.pojo.ShoppingCartSet;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.order.IOrderRPCService;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;
import java.util.List;

/**
 * Created by lenovo on 2017/3/13.
 */
@Path("/api/web/login/order")
@Controller("api/web/login/order")
public class OrderAction {
    Log loger = LogFactory.getLog(OrderAction.class);

    IOrderRPCService service = YytRpcClientFactory.getOrderRPCService();

    @GET
    @Path(value = "/addCar")
    @Produces("text/json;charset=UTF-8")
    public String addCar(@HeaderParam("userId") int userId,
                              @QueryParam("skuId") int skuId,
                              @QueryParam("buyNum") int buyNum){
       int result =  service.addShopCart(userId, skuId, buyNum);
       JSONObject json = new JSONObject();
        if(result>0){
            json.put("status","0000");
        }else{
            json.put("status","0001");
            json.put("message","添加失败");
        }
        return json.toJSONString();
    }

    @GET
    @Path(value = "/delCar")
    @Produces("text/json;charset=UTF-8")
    public String delCar(@QueryParam("id") int id){
        int result =  service.delShopCart(id);
        JSONObject json = new JSONObject();
        if(result>0){
            json.put("status","0000");
        }else{
            json.put("status","0001");
            json.put("message","删除失败");
        }
        return json.toJSONString();
    }

    @GET
    @Path(value = "/car")
    @Produces("text/json;charset=UTF-8")
    public String car(@QueryParam("userId") int userId){
        //权限设置 TODO
        List<ShoppingCartSet> list = service.findUserShopCart(userId);
        JSONObject json = new JSONObject();
        json.put("status","0000");
        json.put("result",list);
        return json.toJSONString();
    }


}
