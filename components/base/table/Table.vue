<template>
  <table class="table-auto border-collapse w-full">
    <thead>
        <tr class="font-bold border-slate-100 bg-slate-50 text-slate-400 text-sm uppercase dark:bg-slate-900 dark:border-0">
          <!-- <th class="py-3 px-4 font-bold text-sm text-left w-20">ID</th> -->
          <slot name="thead"></slot>
        </tr>
    </thead>
    <tbody>
      <slot name="tbody"></slot>
    </tbody>
    <tfoot>
      <slot name="tfooter"></slot>
    </tfoot>
  </table>
</template>

<script setup lang="ts">

</script>
