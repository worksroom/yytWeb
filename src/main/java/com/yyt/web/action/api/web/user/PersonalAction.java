package com.yyt.web.action.api.web.user;

import com.alibaba.fastjson.JSONObject;
import com.youguu.core.logging.Log;
import com.youguu.core.logging.LogFactory;
import com.yyt.print.rpc.client.YytRpcClientFactory;
import com.yyt.print.rpc.client.order.IOrderRPCService;
import com.yyt.print.rpc.client.product.IProductRpcService;
import com.yyt.print.rpc.client.user.IUserRpcService;
import com.yyt.print.user.pojo.User;
import com.yyt.print.user.pojo.UserBuyer;
import com.yyt.print.user.pojo.UserSeller;
import com.yyt.print.user.pojo.UserThirdBind;
import org.springframework.stereotype.Controller;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by leo on 2017/3/14.
 */
@Path("/api/web/user")
@Controller("api/web/user")
public class PersonalAction {

    Log loger = LogFactory.getLog(PersonalAction.class);

    IOrderRPCService orderRPCService = YytRpcClientFactory.getOrderRPCService();
    IUserRpcService userRpcService = YytRpcClientFactory.getUserRpcService();

    /**
     * 加载待付款，待收货，收藏的店铺，收藏的宝贝
     * @param userId
     * @return
     */
    @GET
    @Path(value = "/perfect")
    @Produces("text/json;charset=UTF-8")
    public String perfect(@HeaderParam("userId") int userId){
        JSONObject result = new JSONObject();

        Map<String,Integer> collectCountMap = orderRPCService.getCollectCount(userId);
        Map<Integer,Integer> orderCountMap = orderRPCService.getOrderCount(userId);

        JSONObject map = new JSONObject();
        if(collectCountMap.size()>0){
            map.put("shop", collectCountMap.get("shop"));//收藏的店铺
            map.put("goods", collectCountMap.get("goods"));//收藏的货品
        }

        if(orderCountMap.size()>0){
            map.put("waitPay", orderCountMap.get(0));  //待付款
            map.put("waitDelivery", orderCountMap.get(1));  //待发货
        }

        result.put("result",map);
        result.put("status","0000");
        return result.toJSONString();
    }

    @GET
    @Path(value = "/personal")
    @Produces("text/json;charset=UTF-8")
    public String personal(@HeaderParam("userId") int userId){
        JSONObject result = new JSONObject();

        User user = userRpcService.getUser(userId);
        UserThirdBind thirdBind = userRpcService.getUserThirdBind(userId, User.REGIST_PHONE);
        UserBuyer userBuyer = userRpcService.getUserBuyer(userId);
        UserSeller userSeller = userRpcService.getUserSeller(userId);

        JSONObject userJson = new JSONObject();
        userJson.put("nickname", user.getNickName());
        userJson.put("headpic", user.getHeadImg());
        if(thirdBind!=null){
            userJson.put("phone", thirdBind.getThirdId());
        }

        if(userBuyer!=null){
            userJson.put("buyerName", userBuyer.getName());
        }

        if(userSeller!=null){
            userJson.put("sellerName", userSeller.getName());
        }

        result.put("result",userJson);
        result.put("status","0000");
        return result.toJSONString();
    }

    @POST
    @Path(value = "/buyer_auth")
    @Produces("text/json;charset=UTF-8")
    public String buyerAuth(@HeaderParam("userId") int userId, @FormParam("name") String name
            , @FormParam("cardNumber") String cardNumber
            , @FormParam("cardFPhoto") String cardFPhoto
            , @FormParam("cardBPhoto") String cardBPhoto
            , @FormParam("userCardPhoto") String userCardPhoto){

        UserBuyer userBuyer = new UserBuyer();
        userBuyer.setName(name);
        userBuyer.setUserId(userId);
        userBuyer.setCardNumber(cardNumber);
        userBuyer.setCardFPhoto(cardFPhoto);
        userBuyer.setCardBPhoto(cardBPhoto);

        JSONObject result = new JSONObject();
        int dbFlag = userRpcService.saveUserBuyer(userBuyer);
        if(dbFlag>0){
            result.put("status","0000");
        } else {
            result.put("status","0001");
        }

        return result.toJSONString();
    }

    @POST
    @Path(value = "/seller_auth")
    @Produces("text/json;charset=UTF-8")
    public String sellerAuth(@HeaderParam("userId") int userId, @FormParam("name") String name
            , @FormParam("cardNumber") String cardNumber
            , @FormParam("cardFPhoto") String cardFPhoto
            , @FormParam("cardBPhoto") String cardBPhoto
            , @FormParam("userCardPhoto") String userCardPhoto
            , @FormParam("licencePhone") String licencePhone
            , @FormParam("shopName") String shopName) {

        UserSeller userSeller = new UserSeller();
        userSeller.setUserId(userId);
        userSeller.setName(name);
        userSeller.setCardNumber(cardNumber);
        userSeller.setCardFPhoto(cardFPhoto);
        userSeller.setCardBPhoto(cardBPhoto);
        userSeller.setLicencePhone(licencePhone);
        userSeller.setShopName(shopName);

        JSONObject result = new JSONObject();
        int dbFlag = userRpcService.saveUserSeller(userSeller);
        if(dbFlag>0){
            result.put("status","0000");
        } else {
            result.put("status","0001");
        }

        return result.toJSONString();
    }


    @POST
    @Path(value = "/upload_img")
    @Produces("text/json;charset=UTF-8")
    public String upload_img(@Context HttpServletRequest request,
                             @HeaderParam("userId") int userId,
                             @FormParam("image_data") String imageData) {

        JSONObject json = new JSONObject();
        String filePath = request.getSession().getServletContext().getRealPath("") + File.separator + "images" + File.separator;
//                request.getContextPath() + File.separator + "images" + File.separator;
        String fileName = UUID.randomUUID().toString() + ".png";
        // 参数序列化
        String PicName = fileName;

        // 只允许image
        String header = "data:image";
        String[] imageArr = imageData.split(",");
        if (imageArr[0].contains(header)) {//是img的

            // 去掉头部
            imageData = imageArr[1];
            //image = image.substring(header.length());
            // 写入磁盘
            String success = "fail";
            BASE64Decoder decoder = new BASE64Decoder();
            try {
                byte[] decodedBytes = decoder.decodeBuffer(imageData);        //将字符串格式的image转为二进制流（biye[])的decodedBytes
                String imgFilePath = filePath + PicName;                        //指定图片要存放的位置
                File targetFile = new File(filePath);
                if (!targetFile.exists()) {
                    targetFile.mkdirs();
                }

                FileOutputStream out = new FileOutputStream(imgFilePath);        //新建一个文件输出器，并为它指定输出位置imgFilePath
                out.write(decodedBytes); //利用文件输出器将二进制格式decodedBytes输出
                out.close();                        //关闭文件输出器
                success = "上传文件成功！";
                json.put("status", "0000");
                json.put("imgurl", "images" + File.separator + fileName);
                System.out.println("上传文件成功！");

            } catch (Exception e) {
                json.put("status", "0001");
            }

        }
        return json.toJSONString();
    }


    @POST
    @Path(value = "/bindPhone")
    @Produces("text/json;charset=UTF-8")
    public String bindPhone(@HeaderParam("userId") int userId, @FormParam("phone") String phone
            , @FormParam("smsCode") String smsCode){

        UserThirdBind bind = new UserThirdBind();
        bind.setUserId(userId);
        bind.setType(User.REGIST_PHONE);
        bind.setThirdId(phone);
        bind.setCreateTime(new Date());

        JSONObject result = new JSONObject();
        int dbFlag = userRpcService.saveUserThirdBind(bind);
        if(dbFlag>0){
            result.put("status","0000");
        } else {
            result.put("status","0001");
        }

        return result.toJSONString();
    }
}
