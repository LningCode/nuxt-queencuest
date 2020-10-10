<template>
  <div class="container">
    <div class="error-main">
        <h1 v-if="error.statusCode === 404">404 Page Not Found</h1>
        <h1 v-else>500 Application error exception</h1>
        <Buttons path="/" icon="el-icon-warning" text="CONTINUE SHOPPING" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style lang="scss" scoped>
.error-main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    min-height: 350px;
    .el-button{
      margin-top: 30px;
      max-width: 220px;
    }
}
</style>
