/**
 * @author 胡小右
 * @date 2022-06-17 19:48:19
 * @desc dom操作封装 可以更方便的操作dom元素
 */

import { ref, onBeforeUpdate, Ref } from 'vue';

export function useRefs(): { refs: Ref; setRefs: (index: string) => any } {
  const refs: any = ref<any[]>([]);

  onBeforeUpdate(() => {
    refs.value = [];
  });

  const setRefs = (index: string) => (el: any) => {
    refs.value[index] = el;
  };

  return { refs, setRefs };
}
