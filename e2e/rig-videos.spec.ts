import { test, expect } from "@playwright/test";

/**
 * Verifies that every YouTube video in the "Live from the Rig" section on the
 * Projects page is publicly available and embeddable.
 *
 * Strategy:
 *  1. Load /projects in a real browser.
 *  2. Scope to the "Live from the Rig" <section> by its heading.
 *  3. Read video IDs from [data-video-id] attributes on the click-to-play
 *     buttons (facade pattern — iframes are not rendered until user clicks).
 *  4. Assert exactly 3 rig video cards are present.
 *  5. Probe YouTube oEmbed for each ID: HTTP 200 = public/embeddable.
 *  6. Fail with a clear message if any ID is broken.
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

  const failures: string[] = [];

  for (const videoId of videoIds) {
    if (!videoId) {
      failures.push(`Found a play button with no data-video-id attribute.`);
      continue;
    }
    const oEmbedUrl = `${OEMBED_BASE}https://www.youtube.com/watch?v=${videoId}`;
    const res = await request.get(oEmbedUrl);

    if (!res.ok()) {
      failures.push(
        `Video ID "${videoId}" is unavailable (oEmbed HTTP ${res.status()}).\n` +
          `  Update the VIDEOS array in artifacts/northwave-energy/src/pages/Projects.tsx`
      );
    }
  }

  expect(
    failures,
    `${failures.length} rig video(s) are broken:\n\n${failures.join("\n\n")}`
  ).toHaveLength(0);
});
