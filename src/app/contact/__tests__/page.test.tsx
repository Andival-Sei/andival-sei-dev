import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ContactPage from "../page";

// Мокаем lucide-react иконки
vi.mock("lucide-react", () => ({
  Mail: () => <div data-testid="mail-icon">Mail Icon</div>,
}));

// Мокаем react-icons
vi.mock("react-icons/fa", () => ({
  FaGithub: () => <div data-testid="github-icon">GitHub Icon</div>,
  FaTelegram: () => <div data-testid="telegram-icon">Telegram Icon</div>,
  FaVk: () => <div data-testid="vk-icon">VK Icon</div>,
}));

// Мокаем env
vi.mock("@/lib/env", () => ({
  env: {
    email: "test@example.com",
    github: "https://github.com/test",
    telegram: "https://t.me/test",
    vk: "https://vk.com/test",
  },
}));

describe("ContactPage", () => {
  it("рендерится без ошибок", () => {
    const { container } = render(<ContactPage />);

    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("отображает заголовок страницы", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Свяжитесь со мной")).toBeInTheDocument();
  });

  it("отображает описание страницы", () => {
    render(<ContactPage />);

    expect(screen.getByText(/Открыт для новых проектов/)).toBeInTheDocument();
  });

  it("отображает email контакт", () => {
    render(<ContactPage />);

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
  });

  it("отображает социальные сети", () => {
    render(<ContactPage />);

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Telegram")).toBeInTheDocument();
    expect(screen.getByText("VK")).toBeInTheDocument();
  });

  it("отображает иконки социальных сетей", () => {
    render(<ContactPage />);

    expect(screen.getByTestId("github-icon")).toBeInTheDocument();
    expect(screen.getByTestId("telegram-icon")).toBeInTheDocument();
    expect(screen.getByTestId("vk-icon")).toBeInTheDocument();
  });

  it("содержит ссылки на социальные сети", () => {
    render(<ContactPage />);

    const githubLink = screen.getByText("GitHub").closest("a");
    const telegramLink = screen.getByText("Telegram").closest("a");
    const vkLink = screen.getByText("VK").closest("a");

    expect(githubLink).toHaveAttribute("href", "https://github.com/test");
    expect(telegramLink).toHaveAttribute("href", "https://t.me/test");
    expect(vkLink).toHaveAttribute("href", "https://vk.com/test");
  });

  it("отображает описания социальных сетей", () => {
    render(<ContactPage />);

    expect(screen.getByText("Мои проекты и код")).toBeInTheDocument();
    expect(screen.getByText("Быстрая связь")).toBeInTheDocument();
    expect(screen.getByText("Социальная сеть")).toBeInTheDocument();
  });

  it("имеет правильную структуру", () => {
    const { container } = render(<ContactPage />);

    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("отображает кнопку для отправки email", () => {
    render(<ContactPage />);

    const emailButton = screen.getByText("Отправить письмо");
    expect(emailButton).toBeInTheDocument();
  });
});
