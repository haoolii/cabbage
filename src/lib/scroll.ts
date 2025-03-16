export const scrollTop = () => {
  if (typeof window !== undefined) {
    setTimeout(() => {
      window.scrollTo({
        top: -1,
        left: 0,
        behavior: "smooth", // 平滑滾動
      });
    }, 10);
  }
};
