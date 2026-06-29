import { test, expect } from "@playwright/test";

/**
 * Verifies that every YouTube embed in the "Live from the Rig" section on
 * the Projects page is still publicly available.
 *
 * Strategy:
 *  1. Load /projects in a real browser so the page renders iframes exactly as
 *     visitors see them — no hardcoded video ID list.
 *  2. Scope to the "Live from the Rig" <section> by its heading, so unrelated
 *     YouTube embeds elsewhere on the page don't affect this test.
 *  3. Assert that all three expected rig video cards are present.
 *  4. Parse the video ID out of each iframe src URL.
 *  5. Probe YouTube's oEmbed API for each ID: 200 = public, 404 = gone/private.
 *  6. Fail the test if any ID is unavailable, printing which one broke and
 *     what the page used as its src.
 */

const OEMBED_BASE = "https://www.youtube.com/oembed?format=json&url=";
const YOUTUBE_NOCOOKIE_RE = /youtube-nocookie\.com\/embed\/([A-Za-z0-9_-]+)/;
const EXPECTED_VIDEO_COUNT = 3;

test("all Live from the Rig videos are publicly playable", async ({
  page,
  request,
}) => {
  await page.goto("/projects", { waitUntil: "load" });

  // Scroll to the bottom so lazy-loaded iframes get their src attributes set.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Scope to the "Live from the Rig" section only.
  const rigSection = page.locator("section").filter({
    has: page.locator('h2:has-text("Live from the Rig")'),
  });

  // Wait until the iframes appear inside that section.
  const iframeLocator = rigSection.locator(
    'iframe[src*="youtube-nocookie.com/embed/"]'
  );
  await iframeLocator.first().waitFor({ state: "attached", timeout: 15000 });

  const iframeSrcs: string[] = await iframeLocator.evaluateAll((els) =>
    (els as HTMLIFrameElement[]).map((el) => el.src)
  );

  // Assert the expected number of rig video cards is still present.
  expect(
    iframeSrcs.length,
    `Expected exactly ${EXPECTED_VIDEO_COUNT} YouTube iframes in "Live from the Rig". ` +
      `Found ${iframeSrcs.length}. ` +
      `Update EXPECTED_VIDEO_COUNT in this test if the number of rig videos changes, ` +
      `or restore removed cards in artifacts/northwave-energy/src/pages/Projects.tsx`
  ).toBe(EXPECTED_VIDEO_COUNT);

  const failures: string[] = [];

  for (const src of iframeSrcs) {
    const match = src.match(YOUTUBE_NOCOOKIE_RE);
    if (!match) {
      failures.push(`Could not parse video ID from iframe src: ${src}`);
      continue;
    }
    const videoId = match[1];
    const oEmbedUrl = `${OEMBED_BASE}https://www.youtube.com/watch?v=${videoId}`;

    const res = await request.get(oEmbedUrl);

    if (!res.ok()) {
      failures.push(
        `Video ID "${videoId}" is unavailable (oEmbed HTTP ${res.status()}).\n` +
          `  iframe src: ${src}\n` +
          `  Update the VIDEOS array in artifacts/northwave-energy/src/pages/Projects.tsx`
      );
    }
  }

  expect(
    failures,
    `${failures.length} rig video(s) are broken:\n\n${failures.join("\n\n")}`
  ).toHaveLength(0);
});
