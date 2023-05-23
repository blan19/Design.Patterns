export default abstract class Factory {
  protected abstract isCreatable(name: Core.ItemName): boolean;
  protected abstract createItem(name: Core.ItemName): Core.Item;
  protected abstract postProcessItem(name: Core.ItemName): void;

  create = (name: Core.ItemName): Core.Item | null => {
    const creatable = this.isCreatable(name);
    if (creatable) {
      const item = this.createItem(name);
      this.postProcessItem(name);
      return item;
    }

    return null;
  };
}
