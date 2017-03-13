package com.yyt.web.action.api.web.product;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.product.pojo.ProductEvaluateRecord;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.product.IProductRpcService;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;

/**
 * Created by lenovo on 2017/3/13.
 * 需要登录的接口
 */
@Path("/api/web/login/product")
@Controller("api/web/login/product")
public class ProductLoginAction {
    Log loger = LogFactory.getLog(ProductLoginAction.class);

    IProductRpcService productRpcService = YytRpcClientFactory.getProductRpcService();

    @POST
    @Path(value = "/comment")
    @Produces("text/json;charset=UTF-8")
    public String commentList(@HeaderParam("userId") int userId,
                              @QueryParam("goodId") int goodId,
                              @QueryParam("star") int star,
                              @QueryParam("orderId") String orderId,
                              @QueryParam("des") String des){
        //权限设置 TODO
        ProductEvaluateRecord per = new ProductEvaluateRecord();
        per.setStar(star);
        per.setOrderId(orderId);
        per.setBuyUserId(userId);
        per.setGoodsId(goodId);
        per.setDes(des);
        int result = productRpcService.commentGoods(per);
        JSONObject json = new JSONObject();
        if(result>0){

            json.put("status","0000");
        }else{
            json.put("status","0001");
            json.put("message","评论失败");
        }

        return json.toJSONString();
    }
}
