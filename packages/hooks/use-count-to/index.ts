import { watch, ref } from "vue";
import {
  requestAnimationFrame,
  cancelAnimationFrame,
} from "../../utils/requestAnimationFrame";
import { easeInOut, EasingFunc } from "../../utils/easing";
import type { Ref } from "vue";

interface Options {
  easeFunc?: EasingFunc;
  decimals?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  decimal?: string;
}

interface Result {
  value: Ref<number>;
  label: Ref<string>;
}

export const useCountTo = (
  value: Ref<number>,
  options: Options = {
    decimals: 2,
    separator: ",",
    decimal: ".",
    prefix: "",
    suffix: "",
  }
): Result => {
  // 避免重复触发的id
  let effectId = 0;

  const { decimals, decimal, separator, prefix, suffix } = options;
  const easeFunc = options.easeFunc || easeInOut;

  // 格式化数值
  const formatNumber = (num: number): string => {
    const fixedNum = num.toFixed(decimals);
    const stringNum = String(fixedNum);
    const x = stringNum.split(".");
    let x1 = x[0];
    const x2 = x.length > 1 ? decimal + x[1] : "";
    const rgx = /(\d+)(\d{3})/;
    if (separator && isNaN(parseInt(separator))) {
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + separator + "$2");
      }
    }
    return prefix + x1 + x2 + suffix;
  };

  const newVal = ref(value.value);
  const newValLabel = ref(formatNumber(newVal.value));

  // 监听数值变化
  watch(value, () => {
    effectId++;
    const thisEffectId = effectId;
    const endValue = value.value;
    const startValue = newVal.value;

    const countDown = startValue >= endValue;
    let startTimestamp: number | null;

    const countFunc = (id) => {
      // 已满足结束条件
      const isEnd =
        (countDown && newVal.value <= endValue) ||
        (!countDown && newVal.value >= endValue);

      // 当前执行函数已过期
      if (thisEffectId !== effectId) {
        startTimestamp = null;
        cancelAnimationFrame(id);
        return false;
      }

      // 结束
      if (isEnd) {
        newVal.value = endValue;
        newValLabel.value = formatNumber(newVal.value);
        startTimestamp = null;
        cancelAnimationFrame(id);
        return false;
      }

      // 计算当前时间所在位置
      startTimestamp = startTimestamp || Date.now();
      const progress = Date.now() - startTimestamp;
      const startValue = newVal.value;
      const range = endValue - startValue;
      const duration = 3000;
      newVal.value = easeFunc(progress, startValue, range, duration);
      newValLabel.value = formatNumber(newVal.value);

      // 继续执行到满足结束条件
      requestAnimationFrame(countFunc);
    };
    requestAnimationFrame(countFunc);
  });
  return { value: newVal, label: newValLabel };
};
