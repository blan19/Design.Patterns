declare module Core {
  type ItemName = "sword" | "shield" | "bow";

  interface Item {
    use: () => string;
  }
}
