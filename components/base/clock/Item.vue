<template>
  <div class="local-time items-center hidden lg:flex">
    <div class="flex" :class="{'flex-row-reverse': state.isSwitch}">
      <div class="flex items-center">
          <img src="@/assets/imgs/vietnam.svg" class="w-5" />
          <span class="pl-2 font-bold">{{ state.vn_time }}</span>
      </div>
       <div class="flex ml-5 items-center">
          <img src="@/assets/imgs/switzerland.svg" class="w-4" />
          <span class="pl-2 font-bold ">{{ state.sw_time }}</span>
      </div>
    </div>
    
    <div class="ml-5 font-bold ">{{ state.today }}</div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from "vue"
  import moment from 'moment-timezone';

  interface TimeLocal {
    vn_time: string,
    sw_time: string,
    isSwitch: boolean,
    today: string
  }

 
  const state: TimeLocal = reactive({
    vn_time: '00:00',
    sw_time: '00:00',
    isSwitch: false,
    today: ''
  })

  const getTime = (location:string, format:string) => {
    return moment().tz(location).format(format);
  }

  const getToday = () => {
    return moment().format("ddd, DD MMM");
  }

  state.vn_time = getTime('Asia/Ho_Chi_Minh','LT');
  state.sw_time = getTime('Europe/Zurich','LT');
  state.today = getToday();

  setInterval(() => {
    state.vn_time = getTime('Asia/Ho_Chi_Minh','LT');
    state.sw_time = getTime('Europe/Zurich','LT');
  }, 60000);

</script>
