<template>
  <div class="p-4 bg-slate-100 md">
    <div v-html="rendered"></div>
  </div>
</template>

<script setup lang="ts">
  interface IProps {
    content: string
  }
  const props = defineProps<IProps>()
  const rendered = ref("");

  function renderHtml(){
    rendered.value = useNuxtApp().$mdit.render(props.content); 
  }

  onMounted(() => {
    renderHtml()
  })


</script>

<style lang="scss">
  .md {
      * {
        font-size: 0.875rem;
        line-height: 1.5;
        margin-bottom: 10px;
      }

      h1, h2, h3, h4, h5, h6 {
        font-weight: bold;
        margin: 6px 0;
        line-height: 1.5;
      }

      ul {
        list-style: disc;
        padding-left: 20px;
      }

      a {
        text-decoration: underline;
      }
  }

</style>