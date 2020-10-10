<template>
<el-breadcrumb :separator-class="icon">
    <el-breadcrumb-item v-for="(i, k) in breadcrumb" :key="k" :to="{ path: i.path }">
        {{i.name}}
    </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {
    data () {
        return {
            breadcrumb: [{name: 'HOME', path: '/'}]
        }
    },
    props: {
        list: {
            type: Array,
            required: false,
            default () {
                return [{name: this.$route.name}]
            }
        },
        icon: {
            type: String,
            default: 'el-icon-arrow-right'
        }
    },
    mounted () {
        this.breadcrumb = [...this.breadcrumb, ...this.list];
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-breadcrumb__inner{
    text-transform: uppercase;
}
</style>