package com.yyt.web.action.api.web.product;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.youguu.core.util.PageHolder;
import com.yyt.print.product.pojo.CategoryPro;
import com.yyt.print.product.pojo.MallGoods;
import com.yyt.print.product.pojo.MallGoodsSet;
import com.yyt.print.product.pojo.ProductEvaluateRecord;
import com.yyt.print.product.query.MallGoodsQuery;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.product.IProductRpcService;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;
import java.util.List;

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
        query.setOrder(order);

        PageHolder<MallGoods> list =  productRpcService.findMallGoods(query);
        json.put("result",list);
        json.put("status","0000");
        return json.toJSONString();
    }

    /**
     * 查询产品详情

     * @return
     */
    @GET
    @Path(value = "/productDetail")
    @Produces("text/json;charset=UTF-8")
    public String productDetail(@QueryParam("goodId") int goodId){
        MallGoodsSet mgs = productRpcService.getMallGoodsSetByGood(goodId);
        List<CategoryPro> pro = productRpcService.findProValueByClassId(mgs.getMallGoods().getClassId());
        JSONObject json = new JSONObject();
        json.put("result",mgs);
        json.put("class",pro);
        json.put("status","0000");
        return json.toJSONString();
    }

    /**
     * 查询评论
     * @param goodId
     * @param seq
     * @param num
     * @return
     */
    @GET
    @Path(value = "/commentList")
    @Produces("text/json;charset=UTF-8")
    public String commentList(@QueryParam("goodId") int goodId,
                             @QueryParam("seq") int seq,
                             @QueryParam("num") int num){
        List<ProductEvaluateRecord> list = productRpcService.findProductEvaluateList(goodId, seq, num);
        JSONObject json = new JSONObject();
        json.put("result",list);
        json.put("status","0000");
        return json.toJSONString();
    }


    /**
     * 店铺的数据
     * @param type 0 按照时间   1 按照销售 2按照价格升序  3按照价格降序
     * @return
     */
    @GET
    @Path(value = "/shopProduct")
    @Produces("text/json;charset=UTF-8")
    public String shopProduct(@QueryParam("shopId") int shopId,
                               @QueryParam("type") int type,
                               @QueryParam("pageIndex") int pageIndex,
                               @QueryParam("pageSize") int pageSize){
        JSONObject json = new JSONObject();
        MallGoodsQuery query = new MallGoodsQuery();
        query.setPageIndex(pageIndex);
        query.setPageSize(pageSize);
        query.setStatus(1);
        query.setShopId(shopId);
        query.setNeedCount(false);
        String order = "create_time desc";
        if(type==1){
            order = "sale_num desc";
        }else if(type==2){
            order = "min_price";
        }else if(type==2){
            order = "min_price desc";
        }
        query.setOrder(order);

        PageHolder<MallGoods> list =  productRpcService.findMallGoods(query);
        json.put("result",list);
        json.put("status","0000");
        return json.toJSONString();
    }


}
