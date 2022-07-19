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
  const percent = progress / duration;
  return range * percent + start;
};

// 缓入
export const easeIn: EasingFunc = (progress, start, range, duration) => {
  const percent = progress / duration;
  return range * percent * percent + start;
};

// 缓出
export const easeOut: EasingFunc = (progress, start, range, duration) => {
  const percent = progress / duration;
  return -range * percent * (percent - 2) + start;
};

// 缓入缓出
export const easeInOut: EasingFunc = (progress, start, range, duration) => {
  const percent = progress / duration;
  if (percent < 1) {
    return easeIn(progress, start, range, duration);
  } else {
    return easeOut(progress, start, range, duration);
  }
};
