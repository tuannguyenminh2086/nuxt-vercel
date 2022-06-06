<template>
  <NuxtLayout name='auth'>
    <div class='max-w-md w-full space-y-8'>
      <div>
        <!-- <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"> -->
        <h1
          class='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'
        >
          Lotti
        </h1>
        <h2
          class='mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white'
        >
          Sign in to your account
        </h2>
        <h5 v-if='state.errorMessage !== ""' class='text-center italic text-red-500'> {{ state.errorMessage }}</h5>
      </div>

      <form class='mt-8 space-y-6' @submit='onSubmit'>
        <input type='hidden' name='remember' value='true' />
        <div class='rounded-md shadow-sm -space-y-px'>
          <div>
            <label for='email-address' class='sr-only'>Email address</label>
            <input
              id='email-address'
              v-model.trim='email'
              name='email'

              type='email'
              autocomplete='email'
              required
              class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Email address'

            />
          </div>
          <div>
            <label for='password' class='sr-only'>Password</label>
            <input

              id='password'
              v-model.trim='password'
              name='password'

              type='password'

              autocomplete='current-password'
              required
              class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
              placeholder='Password'

            />
          </div>
        </div>

        <div class='flex items-center justify-between'>
          <div class='flex items-center'>
            <input
              id='remember-me'
              name='remember-me'
              type='checkbox'
              class='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            />
            <label for='remember-me' class='ml-2 block text-sm text-gray-900'>
              Remember me
            </label>
          </div>

          <div class='text-sm'>
            <a
              href='#'
              class='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type='button'
            class='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            @click='onSubmit'
          >
              <span class='absolute left-0 inset-y-0 flex items-center pl-3'>
                <!-- Heroicon name: solid/lock-closed -->
                <svg
                  class='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fill-rule='evenodd'
                    d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                    clip-rule='evenodd'
                  />
                </svg>
              </span>
            Sign in
          </button>
        </div>
      </form>

    </div>
  </NuxtLayout>
</template>

<script setup lang='ts'>
import { useNuxtApp } from '#app'
import { ref, reactive } from 'vue'
import { useAuthStore } from '~~/store/auth'

type LoginRequest = {
  email: string,
  password: string
}
type ResponseResult = {
  status: boolean,
  loginData: any[],
  message: string
}
const state = reactive({
  errorMessage: ''
})

const store = useAuthStore()
const email = ref('')
const password = ref('')

const onSubmit = async () => {
  const { $makeRequest } = useNuxtApp()
  const requestData: LoginRequest = {
    email: email.value,
    password: password.value
  }
  const result = await $makeRequest<LoginRequest, ResponseResult>('post', 'api/authorize/login', requestData)
  if (result && result.status) {
    state.errorMessage = '';
    store.setAuth(result.loginData)
    navigateTo('/')
  } else {
    state.errorMessage = result!.message
  }

}

</script>