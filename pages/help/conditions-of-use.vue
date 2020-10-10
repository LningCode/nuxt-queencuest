<template>
<el-main>
    <div class="min-container">
        <BreadCrumb />
        <div class="desc mt-2" v-html="content"></div>
    </div>
</el-main>
</template>

<script>
export default {
    data() {
        return {
            content: ''
        }
    },
    mounted () {
        this.$axios.$get('getHelp?type=conditions-of-use').then(({data: {content}}) => {
            this.content = content;
        }).catch(_ => {})
    }
}
</script>

<style lang="scss" scoped>
.desc{
    padding: 20px;
    background: #fff;
}
</style>
