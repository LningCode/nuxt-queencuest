<template>
<div class="images-preview mb-3">
    <el-tabs tab-position="left" class="tab-content">
        <el-tab-pane v-for="(i, k) in productImageList" :key="k">
            <div slot="label" class="images-tab">
                <el-image :src="i.url" />
            </div>
            <el-image class="main-image" @click="headlerPreview(i)" :src="i.url" />
        </el-tab-pane>
    </el-tabs>
    <el-carousel
        class="image-carousel"
        :indicator-position="indicatorPosition"
        :height="carouselHeight" arrow="always"
    >
        <el-carousel-item v-for="(i, k) in productImageList" :key="k">
            <el-image :src="i.url" />
        </el-carousel-item>
    </el-carousel>
    <!-- 预览大图 -->
    <el-dialog width="65%" :visible.sync="dialogVisible">
        <el-image class="zoom-preview" :src="previewUrl" />
    </el-dialog>
</div>
</template>

<script>
export default {
    data () {
        return {
            dialogVisible: false,
            previewUrl: '',
            carouselHeight: '300px',
            indicatorPosition: 'outside'
        }
    },
    computed: {
        productImageList () {
            const {productImageList} = this.$store.state.productInfo || {};
            return productImageList || [];
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.headlerResize();
        })
        window.addEventListener('resize', this.headlerResize)
    },
    methods: {
        headlerResize () {
            const w = document.querySelector('.images-preview').offsetWidth;
            this.carouselHeight = w + 'px';
            this.indicatorPosition = w < 400 ? 'none' : 'outside';
        },
        headlerPreview ({url}) {
            this.dialogVisible = true;
            this.previewUrl = url;
        }
    },
    destroyed () {
        window.removeEventListener('resize', this.headlerResize)
    }
}
</script>

<style lang="scss" scoped>
.main-image{
    cursor: zoom-in;
}
.zoom-preview{
    width: 100%;
}
/deep/ .el-tabs__nav-wrap.is-left::after, /deep/ .el-tabs__active-bar{
    width: 0 !important;
}
.image-carousel{
    display: none;
}
/deep/ .tab-content{
    height: 558px;
    .el-tabs__header{
        width: 96px;
        .el-tabs__item{
            padding: 10px 0;
            height: 116px;
            &.is-active::after{
                display: block;
                content: "";
                position: absolute;
                top: 10px;
                left: 0;
                right: 0;
                border: 3px solid #F56C6C;
                bottom: 10px;
                z-index: 2;
            }
            .images-tab{
                height: 100%;
                .el-image{
                    height: 100%;
                }
                .el-image__inner{
                    width: 100%;
                    display: block;
                    height: 100%;
                }
            }
        }
        .el-tabs__nav-prev, .el-tabs__nav-next{
            font-size: 24px;
        }
    }
    .el-tabs__content{
        height: 100%;
        .el-tab-pane{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            .el-image{
                width: 100%;
                max-width: 558px;
            }
        }
    }
}
@media only screen and (max-width: 600px) {
  .tab-content{
    display: none;
  }
  .image-carousel{
    display: block;
    /deep/ .el-image{
        width: 100%;
    }
  }
}
</style>