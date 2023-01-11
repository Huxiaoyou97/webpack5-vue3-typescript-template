/**
 * @author 胡小右
 * @date 2022-06-17 19:58:25
 * @desc React类似Hook封装
 */

import { Ref, UnwrapRef, ref } from 'vue';

export function useState<T>(
  initial: T
): [Ref<UnwrapRef<T>>, (value: T) => void] {
  const state = ref(initial);

  const updater = (newValue: T): void => {
    state.value = newValue as UnwrapRef<T>;
  };

  return [state, updater];
}
