import { test, expect } from "@playwright/test";

/**
 * Verifies that every YouTube video in the "Live from the Rig" section on the
 * Projects page is publicly available, embeddable, and actually renders an
 * iframe when the user clicks the play button.
 *
 * Strategy:
 *  1. Load /projects in a real browser.
 *  2. Scope to the "Live from the Rig" <section> by its heading.
 *  3. Read video IDs from [data-video-id] on the click-to-play facade buttons.
 *  4. Assert exactly 3 rig video cards are present.
 *  5. Probe YouTube oEmbed for each ID (HTTP 200 = public/embeddable).
 *  6. Click each play button and assert the iframe renders with the correct src.
 */

const OEMBED_BASE = "https://www.youtube.com/oembed?format=json&url=";
const EXPECTED_VIDEO_COUNT = 3;

test("all Live from the Rig videos are publicly playable", async ({
  page,
  request,
}) => {
  await page.goto("/projects", { waitUntil: "load" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const rigSection = page.locator("section").filter({
    has: page.locator('h2:has-text("Live from the Rig")'),
  });

  const playButtons = rigSection.locator("button[data-video-id]");
  await playButtons.first().waitFor({ state: "attached", timeout: 15000 });

  const videoIds: string[] = await playButtons.evaluateAll((els) =>
    (els as HTMLButtonElement[]).map((el) => el.getAttribute("data-video-id") ?? "")
  );

  expect(
    videoIds.length,
    `Expected exactly ${EXPECTED_VIDEO_COUNT} rig video cards in "Live from the Rig". ` +
      `Found ${videoIds.length}. ` +
      `Restore removed cards in artifacts/northwave-energy/src/pages/Projects.tsx`
  ).toBe(EXPECTED_VIDEO_COUNT);

  // --- Step 1: oEmbed verification (public + embeddable) ---
  const oEmbedFailures: string[] = [];
  for (const videoId of videoIds) {
    if (!videoId) {
      oEmbedFailures.push(`Found a play button with no data-video-id attribute.`);
      continue;
    }
    const res = await request.get(
      `${OEMBED_BASE}https://www.youtube.com/watch?v=${videoId}`
    );
    if (!res.ok()) {
      oEmbedFailures.push(
        `Video ID "${videoId}" is unavailable or has embedding disabled ` +
          `(oEmbed HTTP ${res.status()}). ` +
          `Update the VIDEOS array in artifacts/northwave-energy/src/pages/Projects.tsx`
      );
    }
  }
  expect(
    oEmbedFailures,
    `${oEmbedFailures.length} video(s) failed oEmbed check:\n\n${oEmbedFailures.join("\n\n")}`
  ).toHaveLength(0);

  // --- Step 2: Click-to-play verification (iframe renders in DOM) ---
  // Re-navigate so each click is tested on a fresh card state.
  for (let i = 0; i < videoIds.length; i++) {
    await page.goto("/projects", { waitUntil: "load" });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const buttons = page
      .locator("section")
      .filter({ has: page.locator('h2:has-text("Live from the Rig")') })
      .locator("button[data-video-id]");

    await buttons.nth(i).waitFor({ state: "attached", timeout: 15000 });
    await buttons.nth(i).click();

    // After clicking, the button is replaced by an <iframe>
    const iframe = page
      .locator("section")
      .filter({ has: page.locator('h2:has-text("Live from the Rig")') })
      .locator(`iframe[src*="${videoIds[i]}"]`);

    await expect(iframe, `Clicking play for video "${videoIds[i]}" did not render an iframe.`)
      .toBeVisible({ timeout: 8000 });
  }
});
