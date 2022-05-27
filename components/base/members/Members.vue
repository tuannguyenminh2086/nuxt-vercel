<template>
  <div v-if="members" class="flex">
    <div
      v-for="(member, index) in members"
      :key="index"
      class="flex flex-row items-center mr-2"
    >
        <div class="border rounded-full p-1 w-8 bg-slate-200 flex items-center justify-center overflow-hidden mr-2">
          <img :src="member.image_path ? member.image_path : randowAvatar " class="object-cover w-full" />
        </div>
        <span v-if="showName" class="text-sm font-semibold">{{ member.name ? member.name : 'n/a'}}</span>          
     </div>
  </div>
</template>

<script setup lang="ts">

  interface IUser {
    name: string
    image_path: string | null
    username?: string
  }

  interface IMember {
    members: IUser[]
    showName: boolean
  }
  
  const props = defineProps<IMember>();
  const randowAvatar = computed(() => useRandomAvatar() )
  
  const members = props.members
  
</script>
