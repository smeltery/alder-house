import { sessions } from "../lib/demo";
import { goals, planningOptions } from "../lib/planning";
const form = document.querySelector<HTMLFormElement>("#planning-tool")!;
const result = document.querySelector<HTMLElement>("#planning-result")!;
const title = document.querySelector("#result-title")!;
const copy = document.querySelector("#result-copy")!;
const summary = document.querySelector("#plan-summary")!;
const actions = document.querySelector<HTMLElement>("#plan-actions")!;
const originalCopy = copy.textContent;
form.querySelector<HTMLButtonElement>('[type="submit"]')!.disabled = false;
form.addEventListener("input", () => {
  actions.hidden = true;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const goal = goals.find((item) => item.label === data.get("goal"));
  const session = sessions.find((item) =>
    goal ? item.id === goal.session : item.name === data.get("session"),
  );
  if (!session) return;
  const params = new URLSearchParams({ session: session.id });
  summary.replaceChildren();
  for (const [key, options] of Object.entries(planningOptions)) {
    const value = String(data.get(key) || "");
    if (!options.includes(value)) continue;
    params.set(key, value);
    const term = document.createElement("dt");
    term.textContent =
      {
        location: "Setting",
        people: "People",
        priority: "Priority",
      }[key] || key;
    const detail = document.createElement("dd");
    detail.textContent = value;
    summary.append(term, detail);
  }
  title.textContent = session.name;
  copy.textContent =
    goal?.reason ||
    "Here’s your starting point. Bring these choices into the inquiry and add any details you’d like us to know.";
  document.querySelector<HTMLAnchorElement>("#plan-inquiry")!.href =
    `/inquire/?${params}`;
  document.querySelector<HTMLAnchorElement>("#plan-session")!.href =
    `/sessions/${session.id}/`;
  actions.hidden = false;
  result.focus({ preventScroll: true });
  result.scrollIntoView({ block: "nearest" });
});
form.addEventListener("reset", () => {
  title.textContent = "A little direction.";
  copy.textContent = originalCopy;
  summary.replaceChildren();
  actions.hidden = true;
});
