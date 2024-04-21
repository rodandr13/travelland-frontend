export const setSlideRef = (
  slideRefs: React.MutableRefObject<HTMLElement[]>,
  ref: HTMLLIElement | null,
  index: number
) => {
  if (ref) slideRefs.current[index] = ref;
};
