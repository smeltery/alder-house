export {};
const guides: Record<string, { colors?: [string, string][]; tips: string[] }> =
  {
    "Coastal light": {
      colors: [
        ["Ivory", "#eee8d8"],
        ["Sky", "#aabfc7"],
        ["Sand", "#c8b79b"],
      ],
      tips: [
        "Pair breathable cotton or linen with soft blue and sandy neutrals.",
        "Mix textures and tones rather than matching every outfit.",
        "Bring a light layer and shoes suited to walking on sand.",
      ],
    },
    "Garden greens": {
      colors: [
        ["Cream", "#eee8d8"],
        ["Rose", "#c29e96"],
        ["Navy", "#354657"],
      ],
      tips: [
        "Balance the greenery with cream, soft rose, or a navy accent.",
        "Choose one subtle pattern and keep the other outfits simple.",
        "Bring shoes that feel steady on grass and a layer for shade.",
      ],
    },
    "City neutrals": {
      colors: [
        ["Stone", "#b9b4a9"],
        ["White", "#faf9f5"],
        ["Ink", "#35404a"],
      ],
      tips: [
        "Start with tailored neutrals and one personal accent.",
        "Try a blazer, knit, or structured shirt for texture.",
        "Bring comfortable walking shoes and check outfits while seated.",
      ],
    },
    "Website refresh": {
      tips: [
        "A wide hero photograph with room for your headline.",
        "An approachable portrait for your about page.",
        "You working in your space, with tools and meaningful details.",
        "Both landscape and portrait versions for different page layouts.",
      ],
    },
    "Social storytelling": {
      tips: [
        "A recognizable profile portrait.",
        "Behind-the-scenes moments showing your process.",
        "Detail photographs that introduce your materials or workspace.",
        "Vertical compositions and a small set of expressive portraits.",
      ],
    },
    "Product launch": {
      tips: [
        "A clear image of the product and its defining details.",
        "The product in use, with a person or familiar object for scale.",
        "A founder portrait that connects a face with the launch.",
        "Wide and vertical compositions with space for launch copy.",
      ],
    },
  };
const form = document.querySelector<HTMLFormElement>("#creative-tool")!;
const result = document.querySelector<HTMLElement>("#creative-result")!;
const list = document.querySelector("#creative-list")!;
const palette = document.querySelector("#palette")!;
const inquiry = document.querySelector<HTMLAnchorElement>("#creative-inquiry")!;
const title = document.querySelector("#creative-title")!;
form.querySelector<HTMLButtonElement>('[type="submit"]')!.disabled = false;
const clear = () => {
  list.replaceChildren();
  palette.replaceChildren();
  inquiry.hidden = true;
  title.textContent = "Room for your ideas.";
  document.querySelector("#creative-intro")!.textContent =
    "Choose a direction to reveal your guide.";
};
form.addEventListener("reset", clear);
form.addEventListener("input", clear);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  clear();
  const direction = String(new FormData(form).get("direction"));
  const guide = guides[direction];
  if (!guide) return;
  title.textContent = direction;
  document.querySelector("#creative-intro")!.textContent = guide.colors
    ? "A palette to make your own:"
    : "Your starting shot list:";
  for (const [name, color] of guide.colors || []) {
    const swatch = document.createElement("span");
    swatch.textContent = name;
    swatch.style.borderTop = `32px solid ${color}`;
    palette.append(swatch);
  }
  for (const tip of guide.tips) {
    const item = document.createElement("li");
    item.textContent = tip;
    list.append(item);
  }
  const params = new URLSearchParams({
    brief: `${direction}: ${guide.tips.join(" ")}`,
  });
  if (form.dataset.kind === "brand") params.set("session", "brands");
  inquiry.href = `/inquire/?${params}`;
  inquiry.hidden = false;
  result.focus({ preventScroll: true });
  result.scrollIntoView({ block: "nearest" });
});
