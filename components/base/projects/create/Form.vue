<template>
  <div class="">
    <FormKit
      id="projectNewForm"
      v-model="formData"
      type="form" 
      :actions="false"
      :disabled="isProgress"
    >
        <FormKit
          type="text"
          label="Project Name"
          name="project_name"
          validation="required|alpha|length:2"
          outer-class="mb-6"
          label-class="block mb-2 font-bold text-sm"
          inner-class="rounded-lg mb-1 overflow-hidden outline-none focus-within:border-blue-500
          formkit-invalid:border-red-500"
          input-class="w-full p-4 border-none text-base text-gray-700 placeholder-gray-400 outline-none"
          message-class="text-red-500 mb-1 mt-3 text-xs"
        />
        
        <FormKit
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
          type="checkbox"
          label="Has a Repo? (option)"
          help="If you want to store your codes, you need to check it."
          name="has-repo"
          wrapper-class="flex items-center mb-1 cursor-pointer"
          input-class="form-check-input appearance-none h-5 w-5 mr-2 border border-gray-200 rounded-sm bg-white checked:bg-blue-500 focus:outline-none focus:ring-0 transition duration-200"
          label-class="text-sm text-gray-700"
          help-class="text-xs text-gray-500 px-7"
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

  const formData = ref({})
  const isProgress = ref(false)

  const createProjectHandle = () => {
    isProgress.value = true
    setTimeout(() => {
      reset('projectNewForm')
      isProgress.value = false
    }, 2000)
    
  }
</script>


