import { test, expect } from "@playwright/test";

test("contact form submits successfully and shows success toast", async ({
  page,
}) => {
  await page.goto("/contact");

  await page.getByTestId("input-name").fill("Jane Testington");
  await page.getByTestId("input-email").fill("jane.testington@example.com");
  await page.getByTestId("input-subject").fill("Equipment Inquiry Test");
  await page
    .getByTestId("input-message")
    .fill(
      "This is an automated test message for offshore equipment leasing inquiry.",
    );

  await page.getByTestId("button-submit-contact").click();

  await expect(page.getByText("Message Sent").first()).toBeVisible({
    timeout: 10000,
  });
});
