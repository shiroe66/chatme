export const parseExpireTime = (value: string) => {
  const unit = value.at(-1);
  const time = Number(value.slice(0, -1));
  return unit === 'h' ? time * 3600 : time * 60;
};
