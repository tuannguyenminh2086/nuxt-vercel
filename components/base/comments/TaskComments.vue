<template>
  <div class="flex flex-col">
     <div class="pt-2 pb-6">
      <div class="mb-4">
        <!-- <textarea
          v-model="comment"
          class="w-full border rounded p-4 resize-none bg-slate-100 dark:text-black"
          rows="4"
          :disabled="isProgress"
          :readonly="isProgress"
        >
        </textarea> -->

         <client-only>
                  <v-md-editor 
                    v-model="comment"
                    left-toolbar='undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image'
                    right-toolbar='preview'
                    :disabled-menus="[]"
                    height="300px"
                    mode="edit"
                    @upload-image="handleUploadImage"
                  />
              </client-only>

      </div>

      <button 
        class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap ring-blue-700 focus:outline-none transition-colors duration-150 border bg-blue-600 text-white border-blue-700 hover:bg-blue-700 py-2 px-3 focus:ring rounded mr-3 last:mr-0 mb-3" 
        type="button"
        :disabled="isProgress"
        @click.prevent="sendComment"
      >
        Comment
      </button>
    </div>

    <div class="border-y p-4 border-slate-100">
      <div 
        v-if="listing.length > 0"
        class="h-96 overflow-hidden overflow-y-auto"
      > 
        <ul>
          <li
            v-for="(item, idx) in listing"
            :key="idx"
            class="my-4 border-b py-4 border-b-gray-100"
          
          >
            <div class="text-sm font-semibold">
              <base-hours :date="item.created_at.toString()" variant="datetime"/>
            </div>
            <!-- eslint-disable vue/no-v-html -->
            <!-- <div v-html="item.content"></div> -->
            <client-only>
              <base-md :content="item.content" />
            </client-only>
            <!--eslint-enable-->
          </li>
        </ul>
      </div>
      <div v-else>
        <base-iddle title="No Comments" />
      </div>
    </div>

   
    
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { useFetch } from '@vueuse/core';
  import { useAuthStore } from '@/store/auth'


  type Comment = {
    content: string
    created_at: string
  }

  interface ICommmentProps {
    comments: Comment[]
    relatedId: string
    type?: string
  }

  const props = defineProps<ICommmentProps>()
  const comment:Ref<string> = ref('')
  const isProgress:Ref<boolean> = ref(false)
  const listing:Ref<Comment[]> = ref([])
    const { uploadImageForTask } = useTask()

  const auth = useAuthStore()
  listing.value = Object.assign([], useOrderBy(props.comments, 'created_at','desc'))

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


  const sendComment = async () => {
    const _token = auth.getAuthToken();

    if (_token) {
       isProgress.value = true
       	const _headers = {
					Authorization: `Bearer ${_token}`,
					Accept: 'application/json'
				};
        const runtimeConfig = useRuntimeConfig()

        const url = runtimeConfig.public.API_URL + '/issues/' + props.relatedId + '/comment'
        const resp = await useFetch( url, {
          headers: _headers
        } ).post({
          comment: comment.value
        }).json()

        if (resp) {
          isProgress.value = false
          refreshNuxtData()
          comment.value = ''
          const _content: Comment = { ...resp.data.value.data.comment }
          listing.value.push(_content);
        }
      
    }
  }
    
</script>
