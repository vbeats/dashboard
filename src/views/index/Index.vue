<template>
    <div class="index">
        {{ msg }}
    </div>
</template>

<script>
import {adminList} from '@/api/user'

export default {
    name: "Index",
    data() {
        return {
            msg: ''
        }
    },
    mounted() {
        adminList().then(res => {
            this.msg = JSON.stringify(res)
        })
    }
}
</script>

<style scoped>

</style>
