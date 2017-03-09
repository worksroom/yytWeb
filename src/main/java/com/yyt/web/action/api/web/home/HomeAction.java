package com.yyt.web.action.api.web.home;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.product.pojo.MallIndex;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.product.IProductRpcService;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;

/**
 * Created by lenovo on 2017/3/2.
 */
@Path("/api/web/home")
@Controller("api/web/home")
public class HomeAction {
    Log loger = LogFactory.getLog(HomeAction.class);

    IProductRpcService productRpcService = YytRpcClientFactory.getProductRpcService();

    @GET
    @Path(value = "/index")
    @Produces("text/json;charset=UTF-8")
    public String home(){
        JSONObject result = new JSONObject();


        List<MallIndex> list =  productRpcService.queryUserMallIndex();
        if(list!=null && list.size()>0){
            result.put("status","0000");
            result.put("result",list);
        }else{
            result.put("status","0001");
            result.put("message","未返回数据");
        }
        return result.toJSONString();
    }
}
