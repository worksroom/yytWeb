package com.yyt.web.action.api.web.info;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.util.PageHolder;
import com.yyt.print.info.pojo.InfoContent;
import com.yyt.print.info.query.InfoQuery;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.info.IInfoRpcService;
import org.springframework.stereotype.Controller;

import javax.ws.rs.*;

/**
 * 资讯
 */
@Path("/api/web/info")
@Controller("api/web/info")
public class InfoAction {

    IInfoRpcService infoRpcService = YytRpcClientFactory.getInfoRpcService();

    /**
     * 厂商供应资讯列表
     *
     * @return
     */
    @GET
    @Path(value = "/supplyList")
    @Produces("text/json;charset=UTF-8")
    public String supplyList(@DefaultValue("1") @QueryParam("pageIndex") int pageIndex,
                             @DefaultValue("10") @QueryParam("pageSize") int pageSize) {

        InfoQuery query = new InfoQuery();
        query.setPageIndex(pageIndex);
        query.setPageSize(pageSize);
        query.setType(2);

        JSONObject json = new JSONObject();

        PageHolder<InfoContent> pageHolder = infoRpcService.queryInfoContentByPage(query);

        json.put("result", pageHolder);
        json.put("status", "0000");
        return json.toJSONString();
    }


    /**
     * 客户需求资讯列表
     *
     * @return
     */
    @GET
    @Path(value = "/demandList")
    @Produces("text/json;charset=UTF-8")
    public String demandList(@DefaultValue("1") @QueryParam("pageIndex") int pageIndex,
                             @DefaultValue("10") @QueryParam("pageSize") int pageSize) {

        InfoQuery query = new InfoQuery();
        query.setPageIndex(pageIndex);
        query.setPageSize(pageSize);
        query.setType(1);

        JSONObject json = new JSONObject();

        PageHolder<InfoContent> pageHolder = infoRpcService.queryInfoContentByPage(query);

        json.put("result", pageHolder);
        json.put("status", "0000");
        return json.toJSONString();
    }


    /**
     * 查询资讯内容
     *
     * @return
     * @throws java.text.ParseException
     */
    @GET
    @Path(value = "/getDemandInfo")
    @Produces("text/json;charset=UTF-8")
    public String getDemandInfo(@QueryParam("id") int id) {

        JSONObject json = new JSONObject();

        InfoContent info = infoRpcService.getInfoContent(id);
        if (info != null) {
            json.put("result", info);
        }

        json.put("status", "0000");
        return json.toJSONString();
    }

    /**
     * 查询资讯内容
     *
     * @return
     */
    @GET
    @Path(value = "/getSupplyInfo")
    @Produces("text/json;charset=UTF-8")
    public String getSupplyInfo(@QueryParam("id") int id) {

        JSONObject json = new JSONObject();

        InfoContent info = infoRpcService.getInfoContent(id);
        if (info != null) {
            JSONObject object = new JSONObject();
            object.put("id", info.getId());
            object.put("weight", info.getWeight());
            object.put("userId", info.getUserId());
            object.put("classId", info.getClassId());
            object.put("title", info.getTitle());
            object.put("type", info.getType());
            object.put("des", info.getDes());
            object.put("photo", info.getPhoto());
            object.put("createTime", info.getCreateTime());
            object.put("updateTime", info.getUpdateTime());

            object.put("venderName", info.transContent().getVenderName());
            object.put("mainBusiness", info.transContent().getMainBusiness());
            object.put("superiority", info.transContent().getSuperiority());
            object.put("area", info.transContent().getArea());
            object.put("address", info.transContent().getAddress());

            json.put("result", object);
        }

        json.put("status", "0000");
        return json.toJSONString();
    }


}
