package com.yyt.web.action.api.web.order;

import java.util.List;

/**
 * Created by leo on 2017/3/22.
 */
public class OrderVO {
    private String orderId;//订单ID
    private int shopId;//店铺ID
    private String shopName;//店铺名称
    private int status;//订单状态
    private int totalum;//商品数量
    private Double totalAmount; //合计金额
    private int isEvaluate;//是否已评价

    private List<ProductVO> list;//商品明细

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getShopId() {
        return shopId;
    }

    public void setShopId(int shopId) {
        this.shopId = shopId;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getTotalum() {
        return totalum;
    }

    public void setTotalum(int totalum) {
        this.totalum = totalum;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<ProductVO> getList() {
        return list;
    }

    public void setList(List<ProductVO> list) {
        this.list = list;
    }

    public class ProductVO{
        private int productId;//商品ID
        private String productName;//商品名称
        private String productImg;//商品图片
        private Double price;//商品价格
        private String productProValue;
        private int productNum;

        public int getProductId() {
            return productId;
        }

        public void setProductId(int productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public String getProductImg() {
            return productImg;
        }

        public void setProductImg(String productImg) {
            this.productImg = productImg;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public String getProductProValue() {
            return productProValue;
        }

        public void setProductProValue(String productProValue) {
            this.productProValue = productProValue;
        }

        public int getProductNum() {
            return productNum;
        }

        public void setProductNum(int productNum) {
            this.productNum = productNum;
        }
    }
}
