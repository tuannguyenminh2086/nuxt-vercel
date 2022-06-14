<template>
  <form
    class="dark:bg-gray-900/70 bg-white p-6"
  >

          <base-form-item control-title="Task Name">
              <input
                v-model="state.name"
                type="text"
                :disabled="isLoading"
                class="px-3 py-2 max-w-full w-full h-12 border-slate-200 rounded border bg-white outline-none  dark:placeholder-gray-400 dark:bg-gray-800"
              />
          </base-form-item>

          <base-form-item control-title="Description">
              <client-only>
                  <v-md-editor 
                    v-model="state.description"
                    left-toolbar='undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code '
                    right-toolbar='preview'
                    :disabled-menus="[]"
                    height="300px"
                    mode="edit"
                    @upload-image="handleUploadImage"
                  />
              </client-only>
          </base-form-item>

          <div class="grid lg:grid-cols-4 lg:gap-8">
            <base-form-item control-title="Assign to">
              <select v-model="state.assignee" class="rounded border w-full py-2 px-4 outline-none">
                <option value="-1">Choose a user</option>
                <option v-for="(item,index) in members" :key="index" :value="item.id">{{ item.name}}</option>
              </select>
            </base-form-item>
            <!-- <base-form-item control-title="Status"></base-form-item>
            <base-form-item control-title="Priority"></base-form-item> -->
            <base-form-item control-title="Due Date">
                <Datepicker
                  v-model='state.due_date'
                  format='yyyy-dd-MM'
                  close-on-scroll
                  auto-apply
                  placeholder='Choose a day'
                  class='relative max-w-full focus:ring focus:outline-none border-slate-100 rounded w-full dark:placeholder-gray-400 border bg-white dark:bg-gray-800'
                />
            </base-form-item>
          </div>

          <hr class="border-gray-100 my-6 -mx-6 dark:border-gray-800 border-t" />

          <div class="flex items-center justify-start flex-wrap -mb-3">

            <button
              class="
                inline-flex
                cursor-pointer
                justify-center
                items-center
                whitespace-nowrap
                focus:outline-none
                transition-colors
                focus:ring
                duration-150
                border
                rounded
                ring-blue-700
                p-2
                bg-blue-600
                text-white
                border-blue-700
                hover:bg-blue-700
                mr-3
                last:mr-0
                mb-3
              "
              type="button"
              :disabled="isLoading"
                @click="submitIssue(true)"
            >
              <span class="px-2">Create & Continue Create</span>
            </button>
            <button
              class="
                inline-flex
                cursor-pointer
                justify-center
                items-center
                whitespace-nowrap
                focus:outline-none
                transition-colors
                focus:ring
                duration-150
                border
                rounded
                ring-blue-700
                p-2
                bg-blue-600
                text-white
                border-blue-700
                hover:bg-blue-700
                mr-3
                last:mr-0
                mb-3
              "
              type="button"
              :disabled="isLoading"
                @click="submitIssue(false)"
            >
              <span class="px-2">Create new Issue</span>
            </button>

            <button
              class="
                inline-flex
                cursor-pointer
                justify-center
                items-center
                whitespace-nowrap
                focus:outline-none
                transition-colors
                focus:ring
                duration-150
                border
                rounded
                ring-blue-700
                p-2
                text-blue-600
                border-blue-700
                hover:bg-blue-700 hover:text-white
                mr-3
                last:mr-0
                mb-3
              "
              type="reset"

              @click="reset"
            >
              <span class="px-2">Reset</span>
            </button>

          </div>



      </form>
</template>

<script setup lang="ts">
  import type { Ref } from 'vue'
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'

  type TCreateIssue = {
    project_id: number,
    name: string
    description: string,
    assignee: number,
    status: number,
    priority: number,
    due_date: string
  }

  const state = reactive<TCreateIssue>({
    project_id: 0,
    description: '',
    name: '',
    assignee: 0,
    status: 6,
    priority: 1,
    due_date: ""
  })


  const route = useRoute()
  const isLoading = ref(false)
  const { createTask, uploadImageForTask } = useTask()
  const nuxtApp = useNuxtApp()

  if (route.params.id ==='' || typeof route.params.id === 'undefined') {
    navigateTo('/projects')
  } else {
    state.project_id = parseInt(route.params.id.toString())
  }
  
  const members: Ref<any> = ref([])

  members.value = (await useMembers()).value

  const reset = () => {
    state.description = ''
    state.name = ''
    state.assignee = 0
    state.due_date = ""
  }

  const handleUploadImage = async (event:any, insertImage:any, files:any) => {

     event.preventDefault();

     const formData = new FormData();
        formData.append("image[]", files[0], files[0].name);
        const data = await uploadImageForTask(formData)

        if (data) {
          const _content: any = { ...data.value.data }
          insertImage({
            url: _content[0].url,
            desc: files[0].name
          });
        }
  }

  const submitIssue = async (stay:boolean) => {

      isLoading.value = true
      const payload = {...state}
      const resp = await createTask(payload)
      console.log(stay)

      console.log(resp)

      if (resp) {
         switch (resp.statusCode.value) {
          case 422:
            nuxtApp.$notification({
                type: 'warn',
                title: 'Error',
                text: resp.data.value.message
              })
            break;
        
          default:
              nuxtApp.$notification({
                type: 'success',
                title: 'Success',
                text: resp.data.value.message ?  resp.data.value.message.message : ''
              })


              if (!stay) {
                setTimeout(()=>{
                  navigateTo('/projects/'+ route.params.id) 
                }, 2000)
              }

            break;
        }

        setTimeout(() => {
          isLoading.value = false
          reset()
        }, 2000);
      }
    
  }

</script>


<style lang="scss">
  .v-md-editor {
    box-shadow: none !important;
    border: 1px solid rgb(226 232 240/var(--tw-border-opacity)) !important;
  }
</style>