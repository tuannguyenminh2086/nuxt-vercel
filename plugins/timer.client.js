import { defineNuxtPlugin } from '#app';
import Timer from "easytimer.js";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('timer', Timer);
})

