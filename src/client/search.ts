export {};
const dialog = document.querySelector<HTMLDialogElement>("#site-search")!;
const input = dialog.querySelector<HTMLInputElement>("input")!;
const links = [...dialog.querySelectorAll<HTMLAnchorElement>("nav a")];
const trigger = document.querySelector<HTMLButtonElement>("#search-trigger")!;
let category = "All";
const filters = [
  ...dialog.querySelectorAll<HTMLButtonElement>(".search-filters button"),
];
let previous: HTMLElement | null = null;
let overflow = "";
const normalize = (text: string) =>
  text.toLocaleLowerCase().replaceAll("families", "family");
const filter = () => {
  const terms = normalize(input.value).trim().split(/\s+/);
  for (const link of links)
    link.hidden =
      (category !== "All" && link.dataset.category !== category) ||
      !terms.every((term) => normalize(link.textContent!).includes(term));
  dialog
    .querySelectorAll<HTMLElement>("[data-search-group]")
    .forEach((group) => {
      group.hidden = ![...group.querySelectorAll<HTMLAnchorElement>("a")].some(
        (link) => !link.hidden,
      );
    });
  const count = links.filter((link) => !link.hidden).length;
  dialog.querySelector("#search-status")!.textContent = count
    ? `${count} results`
    : "No matches. Try ‘session’, ‘tools’, or ‘contact’.";
};
const open = () => {
  if (dialog.open || document.querySelector("dialog[open]")) return;
  previous = document.activeElement as HTMLElement;
  overflow = document.documentElement.style.overflow;
  input.value = "";
  category = "All";
  filters.forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.textContent?.trim() === category),
    ),
  );
  filter();
  dialog.showModal();
  document.documentElement.style.overflow = "hidden";
  input.focus();
};
trigger.hidden = false;
trigger.addEventListener("click", open);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (dialog.open) dialog.close();
    else open();
  }
});
input.addEventListener("input", filter);
filters.forEach((button) =>
  button.addEventListener("click", () => {
    category = button.textContent!.trim();
    filters.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
    filter();
  }),
);
dialog.querySelector("button")!.addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => {
  document.documentElement.style.overflow = overflow;
  previous?.focus();
});
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    dialog.close();
    return;
  }
  const visible = links.filter((link) => !link.hidden);
  const index = visible.indexOf(document.activeElement as HTMLAnchorElement);
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (visible.length)
      visible[
        ((index < 0 && event.key === "ArrowUp" ? 0 : index) +
          (event.key === "ArrowDown" ? 1 : -1) +
          visible.length) %
          visible.length
      ].focus();
  } else if (event.key === "Enter" && document.activeElement === input) {
    event.preventDefault();
    visible[0]?.click();
  } else if (event.key === "Tab") {
    const targets = [
      dialog.querySelector<HTMLButtonElement>("button")!,
      input,
      ...filters,
      ...visible,
    ];
    const first = targets[0],
      last = targets[targets.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
