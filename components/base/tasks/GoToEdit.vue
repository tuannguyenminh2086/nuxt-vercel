<template>
  <div v-if="id" class="">
    <button
      class="text-white ml-2 bg-amber-600 rounded px-4 py-2 hover:bg-amber-700"
      @click.prevent="edit"
    >
      Edit
    </button>
  </div>
</template>

<script setup lang="ts">

  interface IProps {
    id: string
  }

  const props = defineProps<IProps>()

 

  const edit = () => {
    navigateTo('/tasks/' + props.id + '/edit');
  }

</script>


