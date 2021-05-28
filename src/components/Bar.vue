<template>
    <div>
        <h1 @click="fn">Bar</h1>
        <h1>{{$store.state.name}}</h1>
        <!-- <button @click="$store.dispatch('changeName')">++++</button> -->
    </div>
</template>

<script>
export default {
    asyncData(store){ //在服务端执行的方法
        return store.dispatch('changeName')
    },
    methods:{
        fn(){
            alert(1)
        }
    }
}
</script>

<style>

</style>