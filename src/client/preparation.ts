import { preparation } from "../lib/preparation";
const form = document.querySelector<HTMLFormElement>("#preparation-tool")!;
const kind = form.dataset.kind as keyof typeof preparation;
const list = document.querySelector("#preparation-list")!;
const result = document.querySelector<HTMLElement>("#preparation-result")!;
const title = document.querySelector("#preparation-title")!;
const status = document.querySelector("#preparation-status")!;
const inquiry = document.querySelector<HTMLAnchorElement>(
  "#preparation-inquiry",
)!;
form.querySelector<HTMLButtonElement>('[type="submit"]')!.disabled = false;
const clear = () => {
  list.replaceChildren();
  inquiry.hidden = true;
  title.textContent = "Let’s make it easier.";
  status.textContent = "Choose an option to see your guide.";
};
form.addEventListener("input", clear);
form.addEventListener("reset", clear);
list.addEventListener("change", () => {
  status.textContent = `${list.querySelectorAll("input:checked").length} of ${list.children.length} ready`;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const choice = preparation[kind].choices.find(
    (item) => item.label === new FormData(form).get("direction"),
  );
  if (!choice) return;
  clear();
  title.textContent = choice.result;
  status.textContent =
    kind === "checklist"
      ? `0 of ${choice.tips.length} ready`
      : "A setting to explore, not a confirmed venue recommendation.";
  for (const tip of choice.tips) {
    const item = document.createElement("li");
    if (kind === "checklist") {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      label.append(checkbox, document.createTextNode(tip));
      item.append(label);
    } else item.textContent = tip;
    list.append(item);
  }
  const params = new URLSearchParams({
    brief: `${choice.result}: ${choice.tips.join(" ")}`,
  });
  if ("session" in choice) params.set("session", choice.session);
  if ("location" in choice) params.set("location", choice.location);
  inquiry.href = `/inquire/?${params}`;
  inquiry.hidden = false;
  result.focus({ preventScroll: true });
  result.scrollIntoView({ block: "nearest" });
});
