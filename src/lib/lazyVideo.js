// Svelte action for muted, looping clips: load the file only when the video
// scrolls near the viewport, pause it when it leaves, and keep it on its
// poster frame for visitors who prefer reduced motion.
//
//   <video use:lazyVideo={'/videos/clip.mp4'} poster="/videos/clip.jpg" muted loop playsinline preload="none"></video>
export function lazyVideo(node, src) {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof IntersectionObserver === 'undefined') {
    node.src = src;
    return {};
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (!node.getAttribute('src')) node.src = src;
        if (!reduceMotion) node.play().catch(() => {});
      } else {
        node.pause();
      }
    },
    { rootMargin: '200px' }
  );
  io.observe(node);
  return { destroy: () => io.disconnect() };
}
