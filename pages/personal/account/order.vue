<template>
<div class="order-block">
    <el-divider>
        <i class="el-icon-sell"></i>
        <span>My Order</span>
    </el-divider>
    <div class="profile-order">
        <div class="profile-list pt-1 pb-2 mb-1" v-for="(item, k) in 2" :key="k">
            <div class="tray-head mb-1">
                <!-- <span class="status">支付成功</span>
                <Buttons size="mini" text="删除" /> -->
            </div>
            <div class="order-info">
                <div class="shopping-img">
                    <img width="80px" src="https://res.gucci.cn/resources/2019/11/30/1575045345320152_g_720X720.jpg" alt="">
                </div>
                <!-- <div class="shopping-details">
                    <h5 class="shopping-name mb-1">格纹花呢喇叭裤</h5>
                    <p>款号# 611284ZACQC1187</p>
                    <p>款式： 黑色/粉色花呢</p>
                    <p>尺码： 36</p>
                </div>
                <div class="shopping-right">
                    <p>¥12.22</p>
                    <p>x1</p>
                </div> -->
            </div>
            <!-- <div class="tray-bar mt-1">共1件商品 合计：<span class="price">¥12.22</span></div> -->
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.order-block{
    background: #fff;
    padding: 20px;
    .el-divider{
        margin: 15px 0;
    }
    .profile-list{
        border-bottom: 1px solid #eee;
        .tray-head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #606266;
            font-size: 13px;
            .el-button{
                width: auto;
            }
        }
        .order-info{
            display: flex;
            justify-content: space-between;
            .shopping-details{
                width: 100%;
                padding-left: 15px;
                font-size: 13px;
                color: #606266;
            }
            .shopping-right{
                text-align: right;
                font-size: 13px;
            }
        }
        .tray-bar{
            text-align: right;
            color: #606266;
            font-size: 13px;
        }
    }
}
</style>