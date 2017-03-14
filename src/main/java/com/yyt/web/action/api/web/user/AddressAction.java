package com.yyt.web.action.api.web.user;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.user.IUserRpcService;
import com.yyt.print.user.pojo.DeliveryAddr;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;
import java.util.Map;

/**
 * Created by leo on 2017/3/14.
 */
@Path("/api/web/address")
@Controller("api/web/address")
public class AddressAction {
    Log loger = LogFactory.getLog(AddressAction.class);
    IUserRpcService userRpcService = YytRpcClientFactory.getUserRpcService();

    /**
     * 加载待付款，待收货，收藏的店铺，收藏的宝贝
     * @param userId
     * @return
     */
    @GET
    @Path(value = "/addressList")
    @Produces("text/json;charset=UTF-8")
    public String addressList(@HeaderParam("userId") int userId){
        JSONObject result = new JSONObject();

        userId = 1;

        List<DeliveryAddr> list = userRpcService.findUserAddr(userId);

        if(list!=null && !list.isEmpty()){
            result.put("result",list);
        }

        result.put("status","0000");
        return result.toJSONString();
    }

}
