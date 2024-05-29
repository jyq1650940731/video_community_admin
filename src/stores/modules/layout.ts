/*
 * @Author: YourName
 * @Date: 2024-05-29 14:15:59
 * @LastEditTime: 2024-05-29 14:23:05
 * @LastEditors: YourName
 * @Description: 
 * @FilePath: \video_community_admin\src\stores\modules\layout.ts
 * 版权声明
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
    const refsh = ref(false)
    const handleRefshStatus = () =>{
        refsh.value = !refsh.value;
    }

    return {
        refsh,
        handleRefshStatus
    }
})