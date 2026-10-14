import { planningOptions } from "../lib/planning";
import { sessions } from "../lib/demo";
const form = document.querySelector<HTMLFormElement>("#inquiry")!;
const confirmation = document.querySelector<HTMLElement>("#confirmation")!;
const story = form.querySelector<HTMLTextAreaElement>("#story")!;
const counter = document.querySelector("#story-count")!;
const sessionSelect = form.elements.namedItem("session") as HTMLSelectElement;
const params = new URLSearchParams(location.search);
const requested = sessions.find(
  (session) => session.id === params.get("session"),
);
if (requested) sessionSelect.value = requested.name;
for (const [key, options] of Object.entries(planningOptions)) {
  const value = params.get(key);
  if (!value || !options.includes(value)) continue;
  if (key === "priority") {
    const checkbox = [
      ...form.querySelectorAll<HTMLInputElement>('[name="priorities"]'),
    ].find((input) => input.value === value);
    if (checkbox) checkbox.checked = true;
  } else {
    (form.elements.namedItem(key) as HTMLInputElement).value = value;
  }
}
const inspiration = params.get("inspiration")?.trim().slice(0, 160);
if (inspiration && !story.value) {
  story.value = `I’m inspired by “${inspiration}” and would love to plan something similar.`;
  counter.textContent = `${story.value.length.toLocaleString()} / 2,000`;
}
const brief = params.get("brief")?.trim().slice(0, 600);
if (brief && !story.value) {
  story.value = brief;
  counter.textContent = `${story.value.length.toLocaleString()} / 2,000`;
}
form.querySelector<HTMLButtonElement>('[type="submit"]')!.disabled = false;
story.addEventListener("input", () => {
  counter.textContent = `${story.value.length.toLocaleString()} / 2,000`;
});
form.addEventListener("input", () => {
  confirmation.hidden = true;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const summary = document.querySelector("#inquiry-summary")!;
  summary.replaceChildren();
  for (const [label, value] of [
    ["Session", data.get("session")],
    ["Setting", data.get("location")],
    ["Timing", data.get("date") || data.get("flexibility") || "To discuss"],
    [
      "Priorities",
      data.getAll("priorities").join(", ") || "To explore together",
    ],
  ]) {
    const term = document.createElement("dt");
    term.textContent = String(label);
    const detail = document.createElement("dd");
    detail.textContent = String(value);
    summary.append(term, detail);
  }
  confirmation.hidden = false;
  confirmation.focus({ preventScroll: true });
  confirmation.scrollIntoView({ block: "nearest" });
});
form.addEventListener("reset", () => {
  confirmation.hidden = true;
  counter.textContent = "0 / 2,000";
  (form.elements.namedItem("name") as HTMLInputElement).focus();
});
