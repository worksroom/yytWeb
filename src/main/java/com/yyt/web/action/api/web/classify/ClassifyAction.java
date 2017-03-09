package com.yyt.web.action.api.web.classify;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.product.pojo.MallProductCategory;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.product.IProductRpcService;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import java.util.List;

/**
 * Created by lenovo on 2017/3/2.
 */
@Path("/api/web/classify")
@Controller("api/web/classify")
public class ClassifyAction {
    Log loger = LogFactory.getLog(ClassifyAction.class);

    IProductRpcService productRpcService = YytRpcClientFactory.getProductRpcService();

    @GET
    @Path(value = "/index")
    @Produces("text/json;charset=UTF-8")
    public String index(){
        JSONObject result = new JSONObject();
        List<MallProductCategory> list =  productRpcService.findMallProductCategoryList(-1);
        if(list!=null && list.size()>0){
            result.put("status","0000");
            result.put("result", list);
            List<MallProductCategory> sec = productRpcService.findMallProductCategoryList(list.get(0).getId());
            result.put("sec", sec);
        }else{
            result.put("status","0001");
            result.put("message","未返回数据");
        }
        return result.toJSONString();
    }


    @GET
    @Path(value = "/classify")
    @Produces("text/json;charset=UTF-8")
    public String getClassify(@QueryParam("parentId") int parentId){
        JSONObject result = new JSONObject();
        List<MallProductCategory> list =  productRpcService.findMallProductCategoryList(parentId);
        if(list!=null && list.size()>0){
            result.put("status","0000");
            result.put("result", list);
        }else{
            result.put("status","0001");
            result.put("message","未返回数据");
        }
        return result.toJSONString();
    }
}
