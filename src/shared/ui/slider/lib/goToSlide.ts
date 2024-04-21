import scrollIntoView from "scroll-into-view-if-needed";

export const goToSlide = (
  index: number,
  images: any[],
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  slideRefs: React.MutableRefObject<HTMLElement[]>
) => {
  if (index < 0 || index >= images.length) return;
  setCurrentIndex(index);
  scrollIntoView(slideRefs.current[index], {
    scrollMode: "if-needed",
    block: "nearest",
    inline: "nearest",
    behavior: "smooth",
  });
};
