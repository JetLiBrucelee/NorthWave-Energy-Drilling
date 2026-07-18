# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: rig-videos.spec.ts >> all Live from the Rig videos are publicly playable
- Location: e2e/rig-videos.spec.ts:20:5

# Error details

```
Error: page.goto: net::ERR_HTTP_RESPONSE_CODE_FAILURE at https://17924d35-6a05-43ab-ba19-e87e1a5fee48-00-sv4wbaomvesh-q8xuyrk2.janeway.replit.dev/projects
Call log:
  - navigating to "https://17924d35-6a05-43ab-ba19-e87e1a5fee48-00-sv4wbaomvesh-q8xuyrk2.janeway.replit.dev/projects", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This page isn’t working" [level=1] [ref=e7]
    - paragraph [ref=e8]:
      - strong [ref=e9]: 17924d35-6a05-43ab-ba19-e87e1a5fee48-00-sv4wbaomvesh-q8xuyrk2.janeway.replit.dev
      - text: is currently unable to handle this request.
    - generic [ref=e10]: HTTP ERROR 502
  - button "Reload" [ref=e13] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | /**
  4  |  * Verifies that every YouTube video in the "Live from the Rig" section on the
  5  |  * Projects page is publicly available, embeddable, and actually renders an
  6  |  * iframe when the user clicks the play button.
  7  |  *
  8  |  * Strategy:
  9  |  *  1. Load /projects in a real browser.
  10 |  *  2. Scope to the "Live from the Rig" <section> by its heading.
  11 |  *  3. Read video IDs from [data-video-id] on the click-to-play facade buttons.
  12 |  *  4. Assert exactly 3 rig video cards are present.
  13 |  *  5. Probe YouTube oEmbed for each ID (HTTP 200 = public/embeddable).
  14 |  *  6. Click each play button and assert the iframe renders with the correct src.
  15 |  */
  16 | 
  17 | const OEMBED_BASE = "https://www.youtube.com/oembed?format=json&url=";
  18 | const EXPECTED_VIDEO_COUNT = 3;
  19 | 
  20 | test("all Live from the Rig videos are publicly playable", async ({
  21 |   page,
  22 |   request,
  23 | }) => {
> 24 |   await page.goto("/projects", { waitUntil: "load" });
     |              ^ Error: page.goto: net::ERR_HTTP_RESPONSE_CODE_FAILURE at https://17924d35-6a05-43ab-ba19-e87e1a5fee48-00-sv4wbaomvesh-q8xuyrk2.janeway.replit.dev/projects
  25 |   await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  26 | 
  27 |   const rigSection = page.locator("section").filter({
  28 |     has: page.locator('h2:has-text("Live from the Rig")'),
  29 |   });
  30 | 
  31 |   const playButtons = rigSection.locator("button[data-video-id]");
  32 |   await playButtons.first().waitFor({ state: "attached", timeout: 15000 });
  33 | 
  34 |   const videoIds: string[] = await playButtons.evaluateAll((els) =>
  35 |     (els as HTMLButtonElement[]).map((el) => el.getAttribute("data-video-id") ?? "")
  36 |   );
  37 | 
  38 |   expect(
  39 |     videoIds.length,
  40 |     `Expected exactly ${EXPECTED_VIDEO_COUNT} rig video cards in "Live from the Rig". ` +
  41 |       `Found ${videoIds.length}. ` +
  42 |       `Restore removed cards in artifacts/northwave-energy/src/pages/Projects.tsx`
  43 |   ).toBe(EXPECTED_VIDEO_COUNT);
  44 | 
  45 |   // --- Step 1: oEmbed verification (public + embeddable) ---
  46 |   const oEmbedFailures: string[] = [];
  47 |   for (const videoId of videoIds) {
  48 |     if (!videoId) {
  49 |       oEmbedFailures.push(`Found a play button with no data-video-id attribute.`);
  50 |       continue;
  51 |     }
  52 |     const res = await request.get(
  53 |       `${OEMBED_BASE}https://www.youtube.com/watch?v=${videoId}`
  54 |     );
  55 |     if (!res.ok()) {
  56 |       oEmbedFailures.push(
  57 |         `Video ID "${videoId}" is unavailable or has embedding disabled ` +
  58 |           `(oEmbed HTTP ${res.status()}). ` +
  59 |           `Update the VIDEOS array in artifacts/northwave-energy/src/pages/Projects.tsx`
  60 |       );
  61 |     }
  62 |   }
  63 |   expect(
  64 |     oEmbedFailures,
  65 |     `${oEmbedFailures.length} video(s) failed oEmbed check:\n\n${oEmbedFailures.join("\n\n")}`
  66 |   ).toHaveLength(0);
  67 | 
  68 |   // --- Step 2: Click-to-play verification (iframe renders in DOM) ---
  69 |   // Re-navigate so each click is tested on a fresh card state.
  70 |   for (let i = 0; i < videoIds.length; i++) {
  71 |     await page.goto("/projects", { waitUntil: "load" });
  72 |     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  73 | 
  74 |     const buttons = page
  75 |       .locator("section")
  76 |       .filter({ has: page.locator('h2:has-text("Live from the Rig")') })
  77 |       .locator("button[data-video-id]");
  78 | 
  79 |     await buttons.nth(i).waitFor({ state: "attached", timeout: 15000 });
  80 |     await buttons.nth(i).click();
  81 | 
  82 |     // After clicking, the button is replaced by an <iframe>
  83 |     const iframe = page
  84 |       .locator("section")
  85 |       .filter({ has: page.locator('h2:has-text("Live from the Rig")') })
  86 |       .locator(`iframe[src*="${videoIds[i]}"]`);
  87 | 
  88 |     await expect(iframe, `Clicking play for video "${videoIds[i]}" did not render an iframe.`)
  89 |       .toBeVisible({ timeout: 8000 });
  90 |   }
  91 | });
  92 | 
```