<template>
  <div v-if="members" class="flex flex-wrap">
    <div v-if="!pivot">
      <div
        v-for="(member, index) in members"
        :key="index"
        class="flex flex-row items-center mr-2 mb-2"
      >
          <div class="border rounded-full p-1 w-8 bg-slate-200 flex items-center justify-center overflow-hidden mr-2">
            <img :src="member.avatar ? member.avatar : randowAvatar " class="object-cover w-full min-h-full min-w-full" />
          </div>
          <span v-if="showName" class="text-sm font-semibold">{{ member.name ? member.name : 'n/a'}}</span>          
      </div>
    </div>
    <div v-else>
      <div
        v-for="(member, index) in members"
        :key="index"
        class="flex flex-row items-center mr-2 mb-2"
      >
          <div
            v-if="member.pivot.is_main"
            class="border rounded-full p-1 w-8 bg-slate-200 flex items-center justify-center overflow-hidden mr-2">
            <img :src="member.avatar ? member.avatar : randowAvatar " class="object-cover w-full min-h-full min-w-full" />
          </div>
          <span v-if="showName && member.pivot.is_main" class="text-sm font-semibold">{{ member.name ? member.name : 'n/a'}}</span>

      </div>
    </div>

     
  </div>
</template>

<script setup lang="ts">
  import { IUser } from '@/models/interfaces'

  interface IMember {
    members: IUser[]
    showName: boolean
  }
  
  const props = defineProps<IMember>();
  const randowAvatar = computed(() => useRandomAvatar() )
  const members = props.members

  const pivot = computed(() => {
     if ( props.members.length > 0) {
        if ('pivot' in props.members[0]) {
          return true
        }
     }

     return false
  })



  
</script>
