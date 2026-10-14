const root = document.documentElement;
root.classList.add("page-enter");
// Embedded or background browsers can suspend animation timelines.
setTimeout(() => root.classList.remove("page-enter"), 500);
window.addEventListener("pagereveal", (event) => {
  if ((event as Event & { viewTransition?: unknown }).viewTransition)
    root.classList.remove("page-enter");
});
let reset: ReturnType<typeof setTimeout>;
function clearNavigation() {
  clearTimeout(reset);
  root.classList.remove("is-navigating");
}
window.addEventListener("pageshow", clearNavigation);
document.addEventListener("click", (event) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const link =
    event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>("a[href]")
      : null;
  if (
    !link ||
    link.hasAttribute("download") ||
    (link.target && link.target !== "_self")
  )
    return;
  const url = new URL(link.href);
  if (
    url.origin !== location.origin ||
    (url.pathname === location.pathname && url.search === location.search)
  )
    return;
  root.classList.add("is-navigating");
  clearTimeout(reset);
  // Cancelled navigation must never leave the current page blurred.
  reset = setTimeout(clearNavigation, 2000);
});

window.addEventListener("pagehide", () => {
  document
    .querySelectorAll<HTMLDialogElement>("dialog[open]")
    .forEach((dialog) => dialog.close());
});
