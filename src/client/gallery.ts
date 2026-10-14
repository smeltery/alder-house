const viewer = document.querySelector<HTMLDialogElement>("#photo-viewer");
const links = Array.from(
  document.querySelectorAll<HTMLAnchorElement>("[data-gallery-photo]"),
);
if (viewer && links.length) {
  const image = viewer.querySelector<HTMLImageElement>("figure img")!;
  const caption = viewer.querySelector("figcaption")!;
  const count = viewer.querySelector("[data-count]")!;
  const failure = viewer.querySelector<HTMLElement>("[data-image-error]")!;
  let index = 0;
  let trigger: HTMLAnchorElement;
  let overflow = "";
  function show(next: number) {
    index = (next + links.length) % links.length;
    const photo = links[index].querySelector("img")!;
    failure.hidden = true;
    image.alt = photo.alt;
    image.src = links[index].href;
    caption.textContent = photo.alt;
    count.textContent = `${index + 1} / ${links.length}`;
    failure.querySelector("a")!.href = image.src;
  }
  image.addEventListener("error", () => {
    failure.hidden = false;
  });
  links.forEach((link, position) =>
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      trigger = link;
      show(position);
      overflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      viewer.showModal();
      viewer.querySelector<HTMLButtonElement>("[data-close]")!.focus();
    }),
  );
  viewer
    .querySelector("[data-close]")!
    .addEventListener("click", () => viewer.close());
  viewer.addEventListener("close", () => {
    document.documentElement.style.overflow = overflow;
    image.removeAttribute("src");
    trigger?.focus({ preventScroll: true });
  });
  viewer
    .querySelectorAll<HTMLButtonElement>("[data-step]")
    .forEach((button) => {
      button.disabled = links.length < 2;
      button.addEventListener("click", () =>
        show(index + Number(button.dataset.step)),
      );
    });
  viewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      show(index + (event.key === "ArrowRight" ? 1 : -1));
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      show(event.key === "Home" ? 0 : links.length - 1);
    }
  });
  let touchStart = 0;
  image.addEventListener(
    "touchstart",
    (event) => {
      touchStart = event.changedTouches[0].clientX;
    },
    { passive: true },
  );
  image.addEventListener(
    "touchend",
    (event) => {
      const distance = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(distance) > 60) show(index + (distance < 0 ? 1 : -1));
    },
    { passive: true },
  );
}
