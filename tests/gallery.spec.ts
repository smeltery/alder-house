import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("collection viewer supports browsing, focus return, and next story", async ({
  page,
}) => {
  await page.goto("/work/a-little-salt-air/");
  const photos = page.locator("[data-gallery-photo]");
  expect(await photos.count()).toBeGreaterThan(1);
  const source = await photos.nth(1).getAttribute("href");
  await photos.nth(1).click();
  const viewer = page.getByRole("dialog");
  await expect(viewer).toBeVisible();
  await expect(viewer.locator("figure img")).toHaveAttribute(
    "src",
    new URL(source!, page.url()).href,
  );
  await expect(viewer.locator("[data-count]")).toHaveText("2 / 6");
  await expect(
    page.getByRole("button", { name: "Close photo viewer" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.locator("[data-count]")).toHaveText("3 / 6");
  await page.keyboard.press("End");
  await expect(viewer.locator("[data-count]")).toHaveText("6 / 6");
  await page.getByRole("button", { name: "Next photograph" }).click();
  await expect(viewer.locator("[data-count]")).toHaveText("1 / 6");
  await page.getByRole("button", { name: "Previous photograph" }).click();
  await expect(viewer.locator("[data-count]")).toHaveText("6 / 6");
  await page.evaluate(() =>
    Promise.all(
      document.getAnimations().map((a) => a.finished.catch(() => {})),
    ),
  );
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(photos.nth(1)).toBeFocused();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.style.overflow))
    .toBe("");
  await page.getByRole("link", { name: /Next story:/ }).click();
  await expect(page).toHaveURL(/in-your-element/);
});
test("photograph links remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4397/work/a-little-salt-air/");
  await page.locator("[data-gallery-photo]").first().click();
  await expect(page).toHaveURL(/\/images\/family.jpg$/);
  await context.close();
});
