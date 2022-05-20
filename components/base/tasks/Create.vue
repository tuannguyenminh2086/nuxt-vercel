<template>
    <form
          class="
            md:rounded
            border-gray-100
            dark:bg-gray-900/70
            bg-white
            border
            dark:border-gray-800
          "
        >
          <div class="p-6">
            <div class="mb-6 last:mb-0">
              <label class="block font-bold mb-2">Task Name</label>

              <div class="grid grid-cols-1">
                <div class="relative">
                  <input
                    v-model="state.name"
                    type="text"
                    :disabled="isFetching"
                    class="px-3 py-2 max-w-full w-full h-12 border-slate-200 rounded border bg-white focus:ring focus:outline-none dark:placeholder-gray-400 dark:bg-gray-800"
                  />
                </div>
              </div>
              <!---->
            </div>
            <div class="mb-6 last:mb-0">
              <label class="block font-bold mb-2">Description</label>
              <div class="">
                <div class="relative">
                  <client-only>
                    <v-md-editor 
                      v-model="state.description"
                      left-toolbar='undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code '
                      right-toolbar='preview'
                       :disabled-menus="[]"
                      height="300px"
                      mode="editable"
                      @upload-image="handleUploadImage"
                    />
                  </client-only>
                </div>
              </div>
            </div>
            <hr
              class="border-gray-100 my-6 -mx-6 dark:border-gray-800 border-t"
            />
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
                 @click="submitIssue"
              >
                <span class="px-2">Submit</span>
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
          </div>

          {{ error }}
        </form>
</template>

<script setup lang="ts">
  import { useFetch } from '@vueuse/core'
  import { useAuthStore } from '@store/auth'
  const auth = useAuthStore();
  const _token = auth.getAuthToken();
  const nuxtApp = useNuxtApp();
  const route = useRoute()
  const isLoading = ref(false)

  if (route.params.id ==='' || typeof route.params.id === 'undefined') navigateTo('/projects')

  type TCreateIssue = {
    name: string
    description: string
  }

  const state = reactive<TCreateIssue>({
    description: '',
    name: '',
  })


  const reset = () => {
    state.description = ''
    state.name = ''
  }

  const handleUploadImage = async (event:any, insertImage:any, files:any) => {

     event.preventDefault();

     const formData = new FormData();
         formData.append("image[]", files[0], files[0].name);
        const config = useRuntimeConfig()
        const { data }:any = await useFetch(
          `${config.API_URL}/uploads/image`,
          {
            headers: {
              Authorization: `Bearer ${_token}`,
              Accept: 'application/json',
            },
          }
        )
        .post(formData)
        .json();

        if (data) {
          const _content: any = { ...data.value.data }
          insertImage({
            url: _content[0].url,
            desc: files[0].name
          });
        }
  }


  const submitIssue = async () => {

      isLoading.value = true
      const config = useRuntimeConfig()

      const resp = await useFetch(
            `${config.API_URL}/issues`,
            {
              headers: {
                Authorization: `Bearer ${_token}`,
                Accept: 'application/json',
              },
            }
          )
          .post({
            project_id: route.params.id,
            description: state.description,
            name: state.name,
            status: 6,
            priority: 1
          })
          .json();

        

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
          break;
      }


      setTimeout(() => {
        isLoading.value = false
        reset()
      }, 2000);
     
    
  }
</script>


<style lang="scss">
  .v-md-editor {
    box-shadow: none !important;
    border: 1px solid rgb(226 232 240/var(--tw-border-opacity)) !important;
  }
</style>