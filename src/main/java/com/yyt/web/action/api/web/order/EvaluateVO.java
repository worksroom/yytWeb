package com.yyt.web.action.api.web.order;

/**
 * Created by leo on 2017/3/30.
 */
public class EvaluateVO {
	private int star;
	private String content;
	private String imgarray;
	private int goodsId;

	public int getStar() {
		return star;
	}

	public void setStar(int star) {
		this.star = star;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImgarray() {
		return imgarray;
	}

	public void setImgarray(String imgarray) {
		this.imgarray = imgarray;
	}

	public int getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(int goodsId) {
		this.goodsId = goodsId;
	}
}
