<template>
  <div class="">
    <FormKit
      id="projectNewForm"
      type="form" 
      :actions="false"
      :disabled="isProgress"
    >
        <FormKit
          v-model="name"
          type="text"
          label="Project Name"
          name="project_name"
          validation="required|length:2"
          outer-class="mb-6"
          label-class="block mb-2 font-bold text-sm"
          inner-class="rounded-lg mb-1 overflow-hidden outline-none focus-within:border-blue-500
          formkit-invalid:border-red-500"
          input-class="w-full p-4 border-none text-base text-gray-700 placeholder-gray-400 outline-none"
          message-class="text-red-500 mb-1 mt-3 text-xs"
        />
        
        <FormKit
          v-model="desc"
          type="textarea"
          label="Project description (optional)"
          outer-class="mb-6"
          name="project_description"
          rows="6"
          label-class="block mb-2 font-bold text-sm"
          inner-class="rounded-lg overflow-hidden outline-none"
          input-class="w-full p-4 border-none text-base text-gray-700 placeholder-gray-400 outline-none py-4"
        />

        <FormKit
          type="submit"
          input-class="bg-blue-500  text-white font-normal py-3 px-6 rounded mt-10 hover:bg-blue-700 focus:bg-blue-700"
          @click.prevent="createProjectHandle"
        >
          Submit
        </FormKit>

    </FormKit>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { reset } from '@formkit/core'

  const name = ref('')
  const desc = ref('')
  const isProgress = ref(false)
  const { newProject } = useProjects()

  const createProjectHandle = async () => {
    isProgress.value = true
    const payload = Object.assign({},{'name': name.value, 'description': desc.value})
    const res = await newProject(payload)

    if (res.status === 201) {
      reset('projectNewForm')
      isProgress.value = false
      navigateTo('/projects/' + res.data.id)
    }    
  }
</script>


