package com.yyt.web.action.api.web.product;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.youguu.core.util.PageHolder;
import com.yyt.print.product.pojo.MallGoods;
import com.yyt.print.product.query.MallGoodsQuery;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.product.IProductRpcService;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

/**
 * Created by lenovo on 2017/3/8.
 */
@Path("/api/web/product")
@Controller("api/web/product")
public class ProductAction {
    Log loger = LogFactory.getLog(ProductAction.class);

    IProductRpcService productRpcService = YytRpcClientFactory.getProductRpcService();

    /**
     * 产品分类
     * @param type 0 按照时间   1 按照销售 2按照价格升序  3按照价格降序
     * @return
     */
    @GET
    @Path(value = "/classProduct")
    @Produces("text/json;charset=UTF-8")
    public String classProduct(@QueryParam("classId") int classId,
                               @QueryParam("type") int type,
                               @QueryParam("pageIndex") int pageIndex,
                               @QueryParam("pageSize") int pageSize){
        JSONObject json = new JSONObject();
        MallGoodsQuery query = new MallGoodsQuery();
        query.setPageIndex(pageIndex);
        query.setPageSize(pageSize);
        query.setStatus(1);
        query.setClassId(classId);
        query.setNeedCount(false);
        String order = "create_time desc";
        if(type==1){
            order = "sale_num desc";
        }else if(type==2){
            order = "min_price";
        }else if(type==2){
            order = "min_price desc";
        }

        PageHolder<MallGoods> list =  productRpcService.findMallGoods(query);
        json.put("result",list);
        json.put("status","0000");
        return json.toJSONString();
    }
}
