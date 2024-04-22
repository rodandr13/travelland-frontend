import scrollIntoView from "scroll-into-view-if-needed";

export const goToSlide = (
  index: number,
  slidesLength: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  slideRefs: React.MutableRefObject<HTMLElement[]>
) => {
  if (index < 0 || index >= slidesLength) return;
  setCurrentIndex(index);
  scrollIntoView(slideRefs.current[index], {
    scrollMode: "always",
    block: "nearest",
    inline: "start",
    behavior: "smooth",
  });
};
