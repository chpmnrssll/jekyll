let zoom = {
  in: {
    right: (element, duration, iterations) => {
      const keyframes = [
        { opacity: 0, transform: "translate3d(550vw, 0, -200vw) rotateY(35deg)" },
        { opacity: 1, transform: "none" }
      ];
      const timing = {
        duration: duration,
        iterations: iterations,
        easing: "ease-in-out"
      };

      return element.animate(keyframes, timing);
    },
    left: (element, duration, iterations) => {
      const keyframes = [
        { opacity: 0, transform: "translate3d(-550vw, 0, -200vw) rotateY(-35deg)" },
        { opacity: 1, transform: "none" }
      ];
      const timing = {
        duration: duration,
        iterations: iterations,
        easing: "ease-in-out"
      };

      return element.animate(keyframes, timing);
    }
  },
  out: {
    right: (element, duration, iterations) => {
      const keyframes = [
        { opacity: 1, transform: "none" },
        { opacity: 0, transform: "translate3d(550vw, 0, -200vw) rotateY(35deg)" }
      ];
      const timing = {
        duration: duration,
        iterations: iterations,
        easing: "ease-in-out"
      };

      return element.animate(keyframes, timing);
    },
    left: (element, duration, iterations) => {
      const keyframes = [
        { opacity: 1, transform: "none" },
        { opacity: 0, transform: "translate3d(-550vw, 0, -200vw) rotateY(-35deg)" }
      ];
      const timing = {
        duration: duration,
        iterations: iterations,
        easing: "ease-in-out"
      };

      return element.animate(keyframes, timing);
    }
  }
}
