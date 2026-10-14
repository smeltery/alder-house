import { test, expect } from "@playwright/test";

test("finder and planner carry editable choices into the inquiry", async ({
  page,
}) => {
  await page.goto("/tools/session-finder/");
  await page
    .getByLabel("What brings you here?")
    .selectOption({ label: "Create photographs for my business" });
  await page.getByLabel("Your ideal setting").selectOption("At our business");
  await page.getByRole("button", { name: "Show my match" }).click();
  await expect(page.locator("#result-title")).toHaveText("Brands & makers");
  await page.getByRole("link", { name: "Discuss this plan" }).click();
  await expect(page.getByLabel("Your kind of story")).toHaveValue(
    "Brands & makers",
  );
  await expect(page.getByLabel("Location or setting")).toHaveValue(
    "At our business",
  );
  await page.goto("/tools/session-planner/");
  await page
    .getByLabel("Your session", { exact: true })
    .selectOption("Families & couples");
  await page.getByLabel("Who is coming?").selectOption("A family");
  await page.getByLabel("Your main priority").selectOption("Candid moments");
  await page.getByRole("button", { name: "Preview my plan" }).click();
  await page.getByRole("link", { name: "Discuss this plan" }).click();
  await expect(page.getByLabel("Who will be photographed?")).toHaveValue(
    "A family",
  );
  await expect(
    page.getByLabel("Candid moments", { exact: true }),
  ).toBeChecked();
  await page
    .getByLabel("Your kind of story")
    .selectOption("Portraits & milestones");
  await expect(page.getByLabel("Your kind of story")).toHaveValue(
    "Portraits & milestones",
  );
});

test("search supports shortcuts, filtering, keyboard navigation and focus restoration", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Search site" });
  await trigger.focus();
  await page.keyboard.press("Control+k");
  const search = page.getByRole("dialog", { name: "Find your way." });
  await expect(search).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.style.overflow),
  ).toBe("hidden");
  await page
    .getByLabel("Search pages, sessions, and planning tools")
    .fill("no-such-page");
  await expect(page.getByRole("status")).toContainText("No matches");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.style.overflow))
    .toBe("");
  await trigger.click();
  await page
    .getByLabel("Search pages, sessions, and planning tools")
    .fill("planner");
  await page.keyboard.press("ArrowDown");
  await expect(
    search.getByRole("link", { name: /Session planner/ }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/tools\/session-planner\/$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("tool results reset and invalid query options are ignored", async ({
  page,
}) => {
  await page.goto("/tools/session-planner/");
  await page.getByRole("button", { name: "Preview my plan" }).click();
  await expect(page.locator("#plan-actions")).toBeHidden();
  await page
    .getByLabel("Your session", { exact: true })
    .selectOption("Brands & makers");
  await page.getByRole("button", { name: "Preview my plan" }).click();
  await page.getByRole("button", { name: "Start again" }).click();
  await expect(page.locator("#plan-actions")).toBeHidden();
  await page.goto("/inquire/?location=invalid&people=invalid&priority=invalid");
  await expect(page.getByLabel("Location or setting")).toHaveValue("");
  await expect(page.getByLabel("Who will be photographed?")).toHaveValue("");
});

test("directory filters and creative guides lead to editable inquiries", async ({
  page,
}) => {
  await page.goto("/tools/");
  for (const [category, count] of [
    ["Getting started", 3],
    ["Session preparation", 2],
    ["For businesses", 1],
    ["All tools", 6],
  ] as const) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(page.locator(".planning-library article:visible")).toHaveCount(
      count,
    );
    await expect(page.locator("#tool-count")).toContainText(String(count));
  }
  await page
    .getByRole("button", { name: "Session preparation", exact: true })
    .click();
  await expect(page.locator(".planning-library article:visible")).toHaveCount(
    2,
  );
  await page.getByRole("link", { name: "Find my palette" }).click();
  await page.getByLabel("Your setting").selectOption("Coastal light");
  await page.getByRole("button", { name: "Show my palette" }).click();
  await expect(page.locator("#palette span")).toHaveCount(3);
  await page.getByRole("link", { name: "Discuss these ideas" }).click();
  await expect(page.getByLabel("A little about your plans")).toHaveValue(
    /Coastal light/,
  );
  await page.goto("/tools/brand-shot-list/");
  await page.getByLabel("Your main project").selectOption("Website refresh");
  await page.getByRole("button", { name: "Build my shot list" }).click();
  await expect(page.locator("#creative-list li")).toHaveCount(4);
  await page.getByRole("link", { name: "Discuss these ideas" }).click();
  await expect(page.getByLabel("Your kind of story")).toHaveValue(
    "Brands & makers",
  );
  await expect(page.getByLabel("A little about your plans")).toHaveValue(
    /Website refresh/,
  );
});

test("search category filters combine with text and reset when reopened", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search site" }).click();
  const dialog = page.getByRole("dialog", { name: "Find your way." });
  await dialog.getByRole("button", { name: "Tools", exact: true }).click();
  await expect(dialog.locator("nav a:visible")).toHaveCount(6);
  await page
    .getByLabel("Search pages, sessions, and planning tools")
    .fill("wear");
  await expect(dialog.locator("nav a:visible")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Search site" }).click();
  await expect(
    dialog.getByRole("button", { name: "All", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("new planning tools carry settings and reset checklist progress", async ({
  page,
}) => {
  await page.goto("/tools/location-finder/");
  await page
    .getByLabel("What matters most about the setting?")
    .selectOption("Open space and room to move");
  await page.getByRole("button", { name: "Find my setting" }).click();
  await expect(page.locator("#preparation-title")).toHaveText(
    "Try a park or garden",
  );
  await page.getByRole("link", { name: "Discuss this plan" }).click();
  await expect(page.getByLabel("Location or setting")).toHaveValue(
    "In a park or garden",
  );
  await page.goto("/tools/preparation-checklist/");
  await page
    .getByLabel("What are you preparing for?")
    .selectOption("Brands & makers");
  await page.getByRole("button", { name: "Build my checklist" }).click();
  await expect(page.locator("#preparation-list input")).toHaveCount(4);
  await page.locator("#preparation-list input").first().check();
  await expect(page.locator("#preparation-status")).toHaveText("1 of 4 ready");
  await page.getByRole("link", { name: "Discuss this plan" }).click();
  await expect(page.getByLabel("Your kind of story")).toHaveValue(
    "Brands & makers",
  );
  await expect(page.getByLabel("A little about your plans")).toHaveValue(
    /Your brand-session checklist/,
  );
  await page.goBack();
  await page.getByRole("button", { name: "Start again" }).click();
  await expect(page.locator("#preparation-list input")).toHaveCount(0);
});
