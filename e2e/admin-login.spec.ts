import { test, expect } from "@playwright/test";

test("admin login with correct credentials redirects to dashboard", async ({
  page,
}) => {
  await page.goto("/admin");

  await page.getByTestId("input-email").fill("support@northwaveenergy.com");
  await page.getByTestId("input-password").fill("Northwave2026!!");

  await page.getByTestId("button-login").click();

  await expect(page).toHaveURL(/\/admin\/dashboard/, { timeout: 10000 });
});

test("admin login with wrong credentials shows error toast", async ({
  page,
}) => {
  await page.goto("/admin");

  await page.getByTestId("input-email").fill("wrong@example.com");
  await page.getByTestId("input-password").fill("wrongpassword123");

  await page.getByTestId("button-login").click();

  await expect(page.getByText("Auth Failed").first()).toBeVisible({
    timeout: 10000,
  });
  await expect(page).toHaveURL(/\/admin$/, { timeout: 3000 });
});
