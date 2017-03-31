package com.yyt.web.action.api.web.order;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.youguu.core.util.PageHolder;
import com.yyt.print.order.front.OrderProductPojo;
import com.yyt.print.order.pojo.Orders;
import com.yyt.print.order.pojo.ShoppingCartSet;
import com.yyt.print.order.query.OrdersQuery;
import com.yyt.print.product.pojo.ProductEvaluateRecord;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.order.IOrderRPCService;
import com.yyt.print.rpc.client.product.IProductRpcService;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by lenovo on 2017/3/13.
 */
@Path("/api/web/login/order")
@Controller("api/web/login/order")
public class OrderAction {
    Log loger = LogFactory.getLog(OrderAction.class);

    IOrderRPCService service = YytRpcClientFactory.getOrderRPCService();
    IProductRpcService productRpcService = YytRpcClientFactory.getProductRpcService();


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


    /**
     * 查询订单
     * @param userId
     * @param type
     * @return
     */
    @GET
    @Path(value = "/orderlist")
    @Produces("text/json;charset=UTF-8")
    public String orderlist(@HeaderParam("userId") int userId, @QueryParam("type") int type
            , @QueryParam("pageSize") int pageSize
            , @QueryParam("pageIndex") int pageIndex) {
        OrdersQuery ordersQuery = new OrdersQuery();
        ordersQuery.setPageIndex(1);
        ordersQuery.setPageSize(20);
        ordersQuery.setBuyUserId(userId);
        /**
         * 数据库中订单状态，和前端的状态进行匹配查询
         * 0 待支付
         * 1 已支付，待发货
         * 2 已发货
         * 3 结束
         */
        int status = -1;
        if(type==0){
            status = -1;
        } else if(type==1){
            status = 0;
        } else if(type==2){
            status = 1;
        } else if(type==3){
            status = 3;
        } else {
            status = -1;
        }
        ordersQuery.setStatus(status);

        PageHolder<Orders> pageHolder = service.findOrders(ordersQuery);

        PageHolder<OrderVO> voList = new PageHolder<>();
        if(pageHolder != null && !pageHolder.isEmpty()){
            for(Orders order : pageHolder){
                OrderVO orderVO = new OrderVO();

                orderVO.setOrderId(order.getId());
                orderVO.setShopId(order.getShopId());
                orderVO.setShopName("小铺");
                orderVO.setTotalAmount(order.getTotalMoney());
                orderVO.setStatus(order.getStatus());

                int totalNum = 0;
                List<OrderVO.ProductVO> opvList = new ArrayList<>();
                List<OrderProductPojo> oppList = order.transproductDesc();
                if(oppList!=null && !oppList.isEmpty()){
                    for(OrderProductPojo opp : oppList){
                        totalNum += opp.getNum();
                        OrderVO.ProductVO productVO = orderVO.new ProductVO();
                        productVO.setProductName(opp.getProduct_name());
                        productVO.setProductImg(opp.getProduct_img());
                        productVO.setPrice(Double.parseDouble(opp.getPrice()));
                        productVO.setProductNum(opp.getNum());
                        productVO.setProductProValue(opp.getProduct_pro_value());
                        opvList.add(productVO);
                    }

                }
                orderVO.setTotalum(totalNum);
                orderVO.setList(opvList);

                voList.add(orderVO);
            }
            voList.setPageIndex(pageHolder.getPageIndex());
            voList.setPageSize(pageHolder.getPageSize());
            voList.setTotalCount(pageHolder.getTotalCount());
        }

        JSONObject response = new JSONObject();
        response.put("status", "0000");
        response.put("result", voList);

        return response.toJSONString();
    }


    @GET
    @Path(value = "/getorder")
    @Produces("text/json;charset=UTF-8")
    public String getorder(@HeaderParam("userId") int userId,
                           @QueryParam("orderId") String orderId) {
        Orders order = service.getOrders(orderId);

        OrderVO orderVO = new OrderVO();

        orderVO.setOrderId(order.getId());
        orderVO.setShopId(order.getShopId());
        orderVO.setShopName("小铺");
        orderVO.setTotalAmount(order.getTotalMoney());
        orderVO.setStatus(order.getStatus());

        int totalNum = 0;
        List<OrderVO.ProductVO> opvList = new ArrayList<>();
        List<OrderProductPojo> oppList = order.transproductDesc();
        if(oppList!=null && !oppList.isEmpty()){
            for(OrderProductPojo opp : oppList){
                totalNum += opp.getNum();
                OrderVO.ProductVO productVO = orderVO.new ProductVO();
                productVO.setProductName(opp.getProduct_name());
                productVO.setProductImg(opp.getProduct_img());
                productVO.setPrice(Double.parseDouble(opp.getPrice()));
                productVO.setProductNum(opp.getNum());
                productVO.setProductProValue(opp.getProduct_pro_value());
                opvList.add(productVO);
            }

        }
        orderVO.setTotalum(totalNum);
        orderVO.setList(opvList);

        JSONObject response = new JSONObject();
        response.put("status", "0000");
        response.put("result", orderVO);

        return response.toJSONString();
    }


    @POST
    @Path(value = "/evaluate")
    @Produces("text/json;charset=UTF-8")
    public String evaluate(@HeaderParam("userId") int userId,
                           @FormParam("orderId") String orderId,
                           @FormParam("anonymous") int anonymous,
                           @FormParam("evaluateData") String evaluateData) {
        JSONObject result = new JSONObject();

        List<EvaluateVO> evaluateVOList = JSONArray.parseArray(evaluateData, EvaluateVO.class);

        Orders order = service.getOrders(orderId);
        if(null==order){
            result.put("status","0001");
            return result.toJSONString();
        }

        int dbFlag = 0;
        if(null!=evaluateVOList && evaluateVOList.size()>0){
            for(EvaluateVO vo : evaluateVOList){
                dbFlag = productRpcService.rate(userId, order.getSellUserId(), orderId, vo.getGoodsId(), vo.getStar(), vo.getContent(), vo.getImgarray(), anonymous);
            }
        }

        if(dbFlag>0){
            result.put("status","0000");
        } else {
            result.put("status","0001");
        }

        return result.toJSONString();
    }
}
