import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const path of [
  "/",
  "/work/",
  "/about/",
  "/experience/",
  "/inquire/",
  "/work/a-little-salt-air/",
  "/work/in-your-element/",
  "/work/a-name-of-your-own/",
  "/work/just-us-just-here/",
  "/credits/",
  "/privacy/",
  "/brand/",
  "/tools/",
  "/tools/session-finder/",
  "/tools/session-planner/",
  "/tools/location-finder/",
  "/tools/preparation-checklist/",
  "/tools/wardrobe-guide/",
  "/tools/brand-shot-list/",
  "/sessions/portraits/",
  "/sessions/families/",
  "/sessions/brands/",
  "/sessions/celebrations/",
]) {
  test(`${path} is accessible and fits the viewport`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await page.locator("img[src]").evaluateAll((images) =>
      images.forEach((image) => {
        if (image instanceof HTMLImageElement) image.loading = "eager";
      }),
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .map((animation) => animation.finished.catch(() => {})),
      ),
    );
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
    expect(
      await page
        .locator("img[src]")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              image instanceof HTMLImageElement &&
              image.complete &&
              image.naturalWidth > 0,
          ),
        ),
    ).toBe(true);
  });
}
test("visitor explores a story and previews an inquiry without sending data", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore the portfolio", exact: true })
    .first()
    .click();
  await page
    .locator("#stories")
    .getByRole("link", { name: /Families.*A little salt air/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "A little salt air" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Let’s talk about your session" })
    .click();
  await page.getByLabel("Your name").fill("Alex Example");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page
    .getByLabel("Your kind of story")
    .selectOption("Families & couples");
  await page
    .getByLabel("A little about your plans")
    .fill("A fictional family portrait session.");
  await page.getByLabel("Location or setting").fill("A sample coastal park");
  await page.getByLabel("Candid moments").check();
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") submissions.push(request.url());
  });
  await page.getByRole("button", { name: "Preview your inquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Nothing was sent or saved",
  );
  await expect(page.locator("#inquiry-summary")).toContainText(
    "A sample coastal park",
  );
  await expect(page.locator("#inquiry-summary")).toContainText(
    "Candid moments",
  );
  expect(submissions).toEqual([]);
  expect(
    await page.evaluate(() => localStorage.length + sessionStorage.length),
  ).toBe(0);
  await page.getByRole("button", { name: "Try another story" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await expect(page.getByRole("status")).toBeHidden();
});

test("mobile menu traps focus, closes with Escape, and navigates", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu", exact: true });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Main menu" });
  await expect(menu).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(menu.getByRole("button", { name: "Close menu" })).toBeFocused();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(
      await menu.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .map((animation) => animation.finished.catch(() => {})),
    ),
  );
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await menu.getByRole("link", { name: /Sessions/ }).click();
  await expect(page).toHaveURL(/\/experience\/$/);
  await expect(menu).toBeHidden();
});
