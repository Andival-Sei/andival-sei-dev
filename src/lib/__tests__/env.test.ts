import { describe, it, expect } from "vitest";

import { env } from "../env";

describe("env", () => {
  it("имеет все обязательные поля", () => {
    expect(env.siteUrl).toBeDefined();
    expect(env.siteName).toBeDefined();
    expect(env.email).toBeDefined();
    expect(env.github).toBeDefined();
    expect(env.telegram).toBeDefined();
    expect(env.vk).toBeDefined();
  });

  it("имеет правильные типы данных", () => {
    expect(typeof env.siteUrl).toBe("string");
    expect(typeof env.siteName).toBe("string");
    expect(typeof env.email).toBe("string");
    expect(typeof env.github).toBe("string");
    expect(typeof env.telegram).toBe("string");
    expect(typeof env.vk).toBe("string");
  });

  it("имеет значения по умолчанию", () => {
    expect(env.siteUrl).toBe("https://andival-sei-dev.vercel.app");
    expect(env.siteName).toBe("Andival-Sei Portfolio");
  });

  it("имеет опциональные поля", () => {
    // Эти поля могут быть undefined, проверяем что они есть в объекте
    expect(env).toHaveProperty("googleVerification");
    expect(env).toHaveProperty("yandexVerification");
  });

  it("является объектом", () => {
    expect(typeof env).toBe("object");
    expect(env).not.toBeNull();
  });

  it("имеет правильную структуру", () => {
    const expectedKeys = [
      "siteUrl",
      "siteName",
      "email",
      "github",
      "telegram",
      "vk",
      "googleVerification",
      "yandexVerification",
    ];

    expectedKeys.forEach((key) => {
      expect(env).toHaveProperty(key);
    });
  });
});
