// 缓动动画

export type EasingFunc = (
  // 当前时间进度
  progress: number,
  // 开始位置
  start: number,
  // 开始和结束位置之差
  range: number,
  // 总时间
  duration: number
) => number;

// 平滑
export const linear: EasingFunc = (progress, start, range, duration) => {
  const x = progress / duration;
  const y = x;
  return range * y + start;
};

// 缓入
export const easeIn: EasingFunc = (progress, start, range, duration) => {
  const x = progress / duration;
  const y = x * x;
  return range * y + start;
};

// 缓出
export const easeOut: EasingFunc = (progress, start, range, duration) => {
  const x = progress / duration;
  const y = -x * (x - 2);
  return range * y + start;
};

// 缓入缓出
export const easeInOut: EasingFunc = (progress, start, range, duration) => {
  if (progress < duration / 2) {
    return easeIn(progress, start, range / 2, duration / 2);
  } else {
    return easeOut(
      progress - duration / 2,
      start + range / 2,
      range / 2,
      duration / 2
    );
  }
};
