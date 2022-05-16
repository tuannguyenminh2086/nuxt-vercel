<template>
  <div class="flex flex-col">
    <div class="border-bt">
      <h3 class="font-bold text-lg">Comments</h3>

      <div>
          <ul>
            <li class="my-4 border-b py-4 border-b-gray-100">
              <div class="font-semibold">Name - <em class="text-sm">datetime</em></div>
              <div>lreradsda asdsad sads adsad sadsadad sad adad adsad sad sa</div>
            </li>
          </ul>
      </div>
    </div>

    <div class="py-6">
      <div class="mb-4">
        <textarea class="w-full border rounded p-4 resize-none bg-slate-100 dark:text-black" rows="4" >asdad
        </textarea>
      </div>

      <button class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap ring-blue-700 focus:outline-none transition-colors duration-150 border bg-blue-600 text-white border-blue-700 hover:bg-blue-700 py-2 px-3 focus:ring rounded mr-3 last:mr-0 mb-3" type="button">
        Comment
      </button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
  // import { ref } from 'vue'
  // import type { Ref } from 'vue'
  
  // interface ICommmentProps {
  //   comments: any
  //   relatedId: string
  //   type?: string
  // }

  // const props = defineProps<ICommmentProps>()

  // const sendComment = () => {
    
  // }

    

</script>
