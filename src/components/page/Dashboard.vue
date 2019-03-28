<template>
    <div class="dashboard"></div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                
            }
        },
        components: {
            
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){
            
        },
        activated(){
        },
        deactivated(){
          
        },
        methods: {
           
        }
    }

</script>


<style scoped>
    .dashboard{background: url(../../assets/img/bg.png);height: 100%;width: 100%;background-size:cover}

</style>
