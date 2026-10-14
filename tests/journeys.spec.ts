import { test, expect } from "@playwright/test";
test("session detail leads to a preselected, validated inquiry", async ({
  page,
}) => {
  await page.goto("/sessions/brands/");
  await page.getByRole("link", { name: "Plan this session" }).click();
  await expect(page.getByLabel("Your kind of story")).toHaveValue(
    "Brands & makers",
  );
  await page.getByRole("button", { name: "Preview your inquiry" }).click();
  await expect(page.locator("#confirmation")).toBeHidden();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await page.getByLabel("A little about your plans").fill("A new launch");
  await expect(page.locator("#story-count")).toHaveText("12 / 2,000");
  await page.goto("/inquire/?session=unknown");
  await expect(page.getByLabel("Your kind of story")).toHaveValue("");
});
test("brand assets download and favicon is valid SVG", async ({
  page,
  request,
}) => {
  await page.goto("/brand/");
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download the primary logo" }).click();
  expect((await download).suggestedFilename()).toBe("logo.svg");
  for (const path of [
    "/brand/mark.svg",
    "/brand/mark-light.svg",
    "/brand/logo-light.svg",
    "/favicon.svg",
  ]) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    expect(await response.text()).toContain("<svg");
  }
});
test("navigation survives back navigation and honors reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("main")
    .getByRole("link", { name: "Plan your session", exact: true })
    .click();
  await expect(page).toHaveURL(/\/inquire\/$/);
  expect(
    await page
      .locator("main")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Portraits that feel like you",
  );
  expect(
    await page
      .locator("html")
      .evaluate((element) => element.classList.contains("is-navigating")),
  ).toBe(false);
});
test("story inquiry carries editable inspiration and session context", async ({
  page,
}) => {
  await page.goto("/work/a-little-salt-air/");
  const inquiryLinks = page.locator('a[href^="/inquire/"]');
  for (const link of await inquiryLinks.all()) {
    await expect(link).toHaveAttribute("href", /session=families/);
  }
  await page.getByRole("link", { name: "Plan a session of your own" }).click();
  await expect(page.getByLabel("Your kind of story")).toHaveValue(
    "Families & couples",
  );
  await expect(page.getByLabel("A little about your plans")).toHaveValue(
    /A little salt air/,
  );
  await page.getByLabel("A little about your plans").fill("Our own plans");
  await expect(page.locator("#story-count")).toHaveText("13 / 2,000");
});
