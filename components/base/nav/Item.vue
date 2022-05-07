<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseNavItem',
  props: {
    propName: {
      type: String,
      required: true,
    },
    propIcon: {
      type: String,
      default: '',
    },
    propSlug: {
      type: String,
      default: '',
    },
  },
})
</script>

<template>
  <li class="navItem first:mt-0 last:mb-0">
    <router-link
      :to="propSlug"
      :title="propName"
      class="py-4 flex w-full box-border items-center justify-center hover:bg-gray-600 hover:bg-opacity-50 cursor-pointer 2xl:justify-start 2xl:px-4"
    >
      <span
        v-if="propIcon"
        class="flex justify-center align-center navItem__icon"
        v-html="propIcon"
      ></span>
      <span
        class="navItem__title hidden opacity-0 transition-all grow font-bold text-white 2xl:block pl-4 2xl:opacity-100"
        >{{ propName }}</span
      >
    </router-link>
  </li>
</template>

<style lang="scss">
.navItem {
  &__icon {
    width: 20px;

    svg {
      display: block;
      width: 100%;
    }

    path {
      fill: #fff;
    }
  }
}
</style>
