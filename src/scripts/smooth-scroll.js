import Lenis from 'lenis';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)');

let lenis;
let rafId;

function stopSmoothScroll() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = undefined;
  }

  if (lenis) {
    lenis.destroy();
    lenis = undefined;
  }
}

function startSmoothScroll() {
  const shouldUseSmoothScroll = !reduceMotion.matches && desktopPointer.matches;

  if (!shouldUseSmoothScroll) {
    stopSmoothScroll();
    return;
  }

  if (lenis) return;

  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
  });

  function raf(time) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
}

startSmoothScroll();

document.addEventListener('gooddaily:scroll-top', () => {
  if (lenis) {
    lenis.scrollTo(0, {
      duration: 1.05,
      easing: (t) => (t < 0.42 ? 6.75 * t * t * t : 1 - Math.pow(1 - t, 5)),
      force: true,
      lock: true,
    });
    return;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
});

reduceMotion.addEventListener('change', startSmoothScroll);
desktopPointer.addEventListener('change', startSmoothScroll);
