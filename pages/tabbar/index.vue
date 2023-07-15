<template>
	<!-- 登录 -->
	<view class="Login">
		<view class="close" @tap="cancelLogin">关闭</view>
		<view class="head_vicetxt">
			<!-- <image src="/static/Login/Login1.png"></image> -->
			<text>高考补习报名&nbsp;&nbsp;&nbsp;申请使用</text>
		</view>
		<view class="title"> 你的微信头像、昵称、地区和性别信息 </view>
		<!-- <view class="userinfo">
            <view>
                <view>
                    <view class="user_name">子非鱼</view>
                    <view class="user_vice">微信个人信息</view>
                </view>
            </view>
            <u-icon name="checkmark" color="#11D183" size="36"></u-icon>
        </view> -->

		<view class="btnback">
			<button class="confim" open-type="getPhoneNumber" @getphonenumber="loginBtn">
				确定
			</button>
			<button class="cancle" @tap="cancelLogin">拒绝</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginCode: "",
			};
		},
		methods: {
			/**
			 * @function 授权登录
			 * @describe
			 * @author
			 * @date
			 */
			loginBtn(e) {
				console.log(e);
				// let {
				// 	loginCode
				// } = this;
				// if (detail.code) {
				// 	console.log('phonecode'+detail.code);
				// 	this.$post("/applet/wxlogin", {
				// 			code: loginCode,
				// 			phoneCode: detail.code
				// 		})
				// 		.then((res) => {
				// 			this.$toast('登录成功')
				// 			uni.setStorageSync('token',res.data)
				// 			setTimeout(()=>{
				// 				this.$uniRouter.navigateBack();
				// 			},500)
				// 		})

				// } else {
				// 	this.$toast('取消登录')
				// 	this.get_loginCode()
				// }
			},
			/**
			 * @function 取消登录
			 * @describe
			 * @author
			 * @date
			 */
			cancelLogin() {
				this.$toast("取消登录");
				this.$uniRouter.navigateBack();
			},
			/**
			 * @function 获取登录code
			 * @describe
			 * @author
			 * @date
			 */
			get_loginCode(){
				uni.showLoading({
					title: "加载中",
					mask: true,
				});
				uni.login({
					provider: "weixin",
					success: ({
						code
					}) => {
						console.log('code'+code);
						this.loginCode = code
					},
					complete: (error) => {
						uni.hideLoading();
					},
				});
			}
		},
		onLoad() {
			this.get_loginCode()
		},
	};
</script>

<style lang="scss" scoped>
	/**index.wxss**/
	/* 登录背景 */
	.Login {
		padding: 12rpx 60rpx;
	}

	/* 关闭按钮 */
	.close {
		margin-top: 200rpx;
		color: rgba(130, 126, 126, 100);
		font-size: 28rpx;
		padding-left: 5rpx;
	}

	/* 圈子申请使用 */
	.head_vicetxt {
		margin-top: 34rpx;
		display: flex;
		align-items: center;
		color: rgba(170, 169, 169, 100);
		font-size: 28rpx;
	}

	.head_vicetxt>image {
		width: 64rpx;
		height: 56rpx;
		margin-right: 10rpx;
	}

	/* 标题 ,你的微信头像、昵称、地区和性别信息*/
	.title {
		color: rgba(16, 16, 16, 100);
		font-size: 40rpx;
		margin-top: 22rpx;
	}

	/* 微信登录信息 */
	.userinfo {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14rpx 0;
		margin-top: 40rpx;
		border-bottom: 1rpx solid rgba(238, 238, 238, 100);
	}

	.userinfo>view {
		display: flex;
		align-items: center;
	}

	.userinfo image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}

	.user_name {
		color: rgba(11, 11, 11, 100);
		font-size: 28rpx;
	}

	.user_vice {
		margin-top: 6rpx;
		color: rgba(170, 169, 169, 100);
		font-size: 24rpx;
	}

	/* 确定拒绝按钮 */
	.btnback {
		margin-top: 300rpx;

		button {
			width: 328rpx;
			height: 92rpx;
			line-height: 92rpx;
			padding: 0;
			border-radius: 8rpx;
			font-size: 32rpx;
		}
	}

	.confim {
		margin-bottom: 46rpx;
		background-color: #11d183;
		color: #fff;
	}

	.cancle {
		background-color: #fff;
		color: #11d183;
	}
</style>