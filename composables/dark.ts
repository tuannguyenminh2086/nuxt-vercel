import { useDark } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid';

export const isDark = useDark({
  storageKey: 'vue-theme-appearance',
})

export const useUUID = () => useState<string>('lotti-uuid', () => setUUID().value)

export const setUUID = () => {
  const _uuid = ref('')
  if (process.client) {
     _uuid.value = uuidv4()
  }

  return _uuid
}