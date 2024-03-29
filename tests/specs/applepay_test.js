describe("Apple Pay Test", () => {
  it("check if Apple Pay works", async () => {
    await browser.url("https://applepaydemo.apple.com");
    browser.waitUntil(
      async () =>
        (await browser.getTitle()).match(/Apple Pay on the Web Demo/i),
      {
        timeout: 50000,
        timeoutMsg: "expected text to be different after 5s",
      }
    );

    await $("//apple-pay-button").waitForClickable({
      timeout: 50000,
      timeoutMsg: "Apple Pay button not found",
      interval: 100,
    });

    await browser.switchContext("NATIVE_APP");

    const applePayBtn = await $('[name = "Apple Pay"]');

    await applePayBtn.click();

    await browser.execute(
      'browserstack_executor:{"action":"applePay", "arguments": {"confirmPayment" : "true"}}'
    );

    await browser.keys("123456");
  });
});
