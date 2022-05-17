<template>
  <div>
    <base-section title="New Task">
      <template #default>
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
          <header
            class="
              border-gray-100
              flex
              items-stretch
              border-b
              dark:border-gray-800
            "
          >
            <p class="flex items-center py-3 grow font-bold px-4">
              <span class="inline-flex justify-center items-center w-6 h-6 mr-3"
                ><svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  class="inline-block"
                >
                  <path
                    fill="currentColor"
                    d="M13,9.5H18V7.5H13V9.5M13,16.5H18V14.5H13V16.5M19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21M6,11H11V6H6V11M7,7H10V10H7V7M6,18H11V13H6V18M7,14H10V17H7V14Z"
                  ></path></svg
              ></span>
              Create New Task/Issue
            </p>
            <!-- <a
              href="#"
              class="
                flex
                items-center
                py-3
                px-4
                justify-center
                ring-blue-700
                focus:ring
              "
              aria-label="more options"
              ><span class="inline-flex justify-center items-center w-6 h-6"
                ><svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  class="inline-block"
                >
                  <path
                    fill="currentColor"
                    d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                  ></path></svg></span
            ></a> -->
          </header>
          <div class="p-6">
            <div class="mb-6 last:mb-0">
              <label class="block font-bold mb-2">Task Name</label>
              <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div class="relative">
                  <input
                    v-model="state.name"
                    type="text"
                    class="
                      px-3
                      py-2
                      max-w-full
                      focus:ring focus:outline-none
                      border-gray-700
                      rounded
                      w-full
                      dark:placeholder-gray-400
                      h-12
                      border
                      bg-white
                      dark:bg-gray-800
                      pl-10
                    "
                    style="
                      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfBJREFUWAntVk1OwkAUZkoDKza4Utm61iP0AqyIDXahN2BjwiHYGU+gizap4QDuegWN7lyCbMSlCQjU7yO0TOlAi6GwgJc0fT/fzPfmzet0crmD7HsFBAvQbrcrw+Gw5fu+AfOYvgylJ4TwCoVCs1ardYTruqfj8fgV5OUMSVVT93VdP9dAzpVvm5wJHZFbg2LQ2pEYOlZ/oiDvwNcsFoseY4PBwMCrhaeCJyKWZU37KOJcYdi27QdhcuuBIb073BvTNL8ln4NeeR6NRi/wxZKQcGurQs5oNhqLshzVTMBewW/LMU3TTNlO0ieTiStjYhUIyi6DAp0xbEdgTt+LE0aCKQw24U4llsCs4ZRJrYopB6RwqnpA1YQ5NGFZ1YQ41Z5S8IQQdP5laEBRJcD4Vj5DEsW2gE6s6g3d/YP/g+BDnT7GNi2qCjTwGd6riBzHaaCEd3Js01vwCPIbmWBRx1nwAN/1ov+/drgFWIlfKpVukyYihtgkXNp4mABK+1GtVr+SBhJDbBIubVw+Cd/TDgKO2DPiN3YUo6y/nDCNEIsqTKH1en2tcwA9FKEItyDi3aIh8Gl1sRrVnSDzNFDJT1bAy5xpOYGn5fP5JuL95ZjMIn1ya7j5dPGfv0A5eAnpZUY3n5jXcoec5J67D9q+VuAPM47D3XaSeL4AAAAASUVORK5CYII=');
                      background-repeat: no-repeat;
                      background-attachment: scroll;
                      background-size: 16px 18px;
                      background-position: 98% 50%;
                      cursor: auto;
                    "
                  /><span
                    class="
                      inline-flex
                      justify-center
                      items-center
                      w-10
                      h-12
                      absolute
                      top-0
                      left-0
                      z-10
                      pointer-events-none
                      text-gray-500
                      dark:text-gray-400
                    "
                    ><svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      class="inline-block"
                    >
                      <path
                        fill="currentColor"
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                      ></path></svg
                  ></span>
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
                    right-toolbar='preview sync-scroll'
                    ></v-md-editor>
                  </client-only>
                </div>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Markdown support
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
                @click="submitIssue"
              >
                <!----><span class="px-2">Submit</span></button
              ><button
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
              >
                <!----><span class="px-2">Reset</span>
              </button>
            </div>
          </div>
        </form>
      </template>
    </base-section>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { useAuthStore } from '@store/auth'
const auth = useAuthStore();
const _token = auth.getAuthToken();
const {$config} = useNuxtApp();
type TCreateIssue = {
  name: string
  description: string
}
const state = reactive<TCreateIssue>({
  description: '',
  name: '',
})
const submitIssue = async () => {
  /**
   * temporate project id
   */
  const projectId = 61
  const { data } = await useFetch(
    `${$config.public.API_URL}/issues`,
    {
      headers: {
        Authorization: `Bearer ${_token}`,
        Accept: 'application/json',
      },
    }
  )
    .post({
      project_id:projectId,
      description: state.description,
      name: state.name,
    })
    .json();
    return data;
}
</script>