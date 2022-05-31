<template>
  <div class="assignee flex">
    <select v-model="assignee" class="rounded border w-full py-2 px-4 outline-none mr-2">
      <option value="-1">Choose a user</option>
      <option v-for="(item,index) in members" :key="index" :value="item.id">{{ item.name}}</option>
    </select>
    <button class="outline-none px-4 py-2 inline-flex cursor-pointer justify-center items-center whitespace-nowrap 
        focus:outline-none transition-colors 
        border rounded p-2 bg-emerald-600 text-white border-emerald-700 
        hover:bg-emerald-700" @click.stop="onAssigneeHandle">
        Change
    </button>
  </div>
</template>

<script setup lang="ts">
  import type { Ref } from 'vue'
  
  interface IProps {
    members: {
      id: string
      image_path: string
      name: string
    }[],
    iid: string
  }

  const props = defineProps<IProps>()

  const members: Ref<any> = ref([])
  const assignee: Ref<any> = ref('')
  const { assigneeTo } = useTask()
  const { $bus, $notification } = useNuxtApp()
  members.value = (await useMembers()).value

  const onAssigneeHandle = async () => {
    const res = await assigneeTo(props.iid, assignee.value)

    if ( res.status) {
        $bus.$emit('refetch-issue')
        $notification({
          type: 'success',
          title: 'Success',
          text: res.message ? res.message.message : ''
        })
    }
    
  }

  onMounted (() => {
    if (props.members.length > 0) {
      assignee.value = props.members[0].id
    }
  })

</script>