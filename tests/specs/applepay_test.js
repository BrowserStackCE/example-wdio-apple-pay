const { DRIVER_DEFAULT_ENDPOINT } = require("webdriverio/build/constants");

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

    const keySequence = ["1", "2", "3", "4", "5", "6"];

    const keyDownActions = keySequence.map((value) => ({
      type: "keyDown",
      value,
    }));
    const keyUpActions = keySequence.map((value) => ({ type: "keyUp", value }));

    await browser.performActions([
      {
        type: "key",
        id: "keyboard",
        actions: [...keyDownActions, ...keyUpActions],
      },
    ]);
  });
});
