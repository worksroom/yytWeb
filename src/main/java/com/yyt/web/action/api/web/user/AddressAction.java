package com.yyt.web.action.api.web.user;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.user.IUserRpcService;
import com.yyt.print.user.pojo.DeliveryAddr;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by leo on 2017/3/14.
 */
@Path("/api/web/address")
@Controller("api/web/address")
public class AddressAction {
    private static final Log loger = LogFactory.getLog(AddressAction.class);
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

        List<DeliveryAddr> list = userRpcService.findUserAddr(userId);

        if(list!=null && !list.isEmpty()){
            result.put("result",list);
        }

        result.put("status","0000");
        return result.toJSONString();
    }

    /**
     * 查询收货地址
     * @param userId
     * @param addrId
     * @return
     */
    @GET
    @Path(value = "/get")
    @Produces("text/json;charset=UTF-8")
    public String get(@HeaderParam("userId") int userId, @QueryParam("addrId") int addrId){
        JSONObject result = new JSONObject();

        DeliveryAddr addr = userRpcService.getUserAddr(addrId);

        result.put("result",addr);
        result.put("status","0000");
        return result.toJSONString();
    }

    /**
     * 添加收货地址
     * @param userId
     * @param name
     * @param phone
     * @param region
     * @param addr
     * @param code
     * @return
     */
    @POST
    @Path(value = "/add")
    @Produces("text/json;charset=UTF-8")
    public String add(@HeaderParam("userId") int userId, @FormParam("name") String name
            , @FormParam("id") int id
            , @FormParam("phone") String phone
            , @FormParam("region") String region
            , @FormParam("street") String street
            , @FormParam("addr") String addr
            , @FormParam("code") String code
            , @FormParam("default_flag") int default_flag) {
        JSONObject result = new JSONObject();

        DeliveryAddr deliveryAddr = new DeliveryAddr();
        deliveryAddr.setCreateTime(new Date());
        deliveryAddr.setUserId(userId);

        if(id>0){
            deliveryAddr = userRpcService.getUserAddr(id);
            deliveryAddr.setUpdateTime(new Date());
        }

        deliveryAddr.setName(name);
        deliveryAddr.setPhone(phone);
        deliveryAddr.setRegion(region);
        deliveryAddr.setStreet(street);
        deliveryAddr.setAddr(addr);
        deliveryAddr.setCode(code);
        deliveryAddr.setDefaultAddr(default_flag);

        int dbFlag = 0;
        if(id>0){
            dbFlag = userRpcService.updateUserAddr(deliveryAddr);
        } else {
            dbFlag = userRpcService.addUserAddr(deliveryAddr);
        }
        if(dbFlag>0){
            result.put("status","0000");
        } else {
            result.put("status","0001");
        }

        return result.toJSONString();
    }

    /**
     * 删除收货地址
     * @param userId
     * @param id
     * @return
     */
    @POST
    @Path(value = "/delete")
    @Produces("text/json;charset=UTF-8")
    public String delete(@HeaderParam("userId") int userId, @FormParam("addrId") int id){
        JSONObject result = new JSONObject();

        int dbFlag = userRpcService.delUserAddr(id);
        if(dbFlag>0){
            result.put("status","0000");
        } else {
            result.put("status","0001");
        }

        return result.toJSONString();
    }
}
