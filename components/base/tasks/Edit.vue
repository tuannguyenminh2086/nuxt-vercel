<template>
  <form
    v-if="state.issue !== null"
    class="dark:bg-gray-900/70 bg-white p-6"
  >
          <base-form-item control-title="Task Name">
              <input
                v-model="state.issue.name"
                type="text"
                :disabled="isLoading"
                class="px-3 py-2 max-w-full w-full h-12 border-slate-200 rounded border bg-white outline-none  dark:placeholder-gray-400 dark:bg-gray-800"
              />
          </base-form-item>

          <base-form-item control-title="Description">
              <client-only>
                  <v-md-editor 
                    v-model="state.issue.description"
                    left-toolbar='undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code '
                    right-toolbar='preview'
                    :disabled-menus="[]"
                    height="300px"
                    mode="edit"
                    @upload-image="handleUploadImage"
                  />
              </client-only>
          </base-form-item>

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
                @click="updateIssue()"
            >
              <span class="px-2">Update</span>
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

              @click.prevent="backToTask"
            >
              <span class="px-2">Back</span>
            </button>
          </div>
      </form>
</template>

<script setup lang="ts">
import { IIssues } from '~~/models/interfaces'

  interface IProps {
    issue: IIssues
  }

  const props = defineProps<IProps>()
  const state = reactive<IProps>(props);


  type TUpdateIssue = {
    name: string
    description: string,
  }

  const isLoading = ref(false)
  const { updateTask, uploadImageForTask } = useTask()

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

  const updateIssue = async () => {

      isLoading.value = true
      const payload : TUpdateIssue = {
        name: state.issue.name,
        description: state.issue.description,
      }
      const resp = await updateTask(parseInt(state.issue.id), payload);
      const { sendNotification } = useNotification()

      if (resp) {
         switch (resp.statusCode.value) {
          case 422:
              sendNotification(resp.data.value.message, 'warn', 'Task Create' );
            break;
        
          default:
              sendNotification('Successfully updated!', 'success', 'Task Create' )
            break;
        }

        setTimeout(() => {
          isLoading.value = false
        }, 2000);
      }
    
  }

  const backToTask = () => {
    navigateTo('/tasks/'+ props.issue.id) 
  }

</script>


<style lang="scss">
  .v-md-editor {
    box-shadow: none !important;
    border: 1px solid rgb(226 232 240/var(--tw-border-opacity)) !important;
  }
</style>