import Sword from "../Sword";
import Bow from "../Bow";
import Shield from "../Shield";
import Factory from "./Factory";

class ItemCount {
  private _currentCount = 0;

  constructor(private _maxCount: number) {}

  get maxCount() {
    return this._maxCount;
  }

  isCreatable(): boolean {
    return this._currentCount < this.maxCount;
  }

  increaseCount(): void {
    if (this.isCreatable()) this._currentCount++;
  }
}

export default class ItemFactory extends Factory {
  private repository = new Map<Core.ItemName, ItemCount>();

  constructor() {
    super();

    this.repository.set("sword", new ItemCount(3));
    this.repository.set("shield", new ItemCount(5));
    this.repository.set("bow", new ItemCount(2));
  }

  protected isCreatable(name: Core.ItemName): boolean {
    const itemCount = this.repository.get(name);
    return !!itemCount?.isCreatable();
  }

  protected createItem(name: Core.ItemName): Core.Item {
    if (name === "sword") return new Sword();
    if (name === "bow") return new Bow();
    return new Shield();
  }

  protected postProcessItem(name: Core.ItemName): void {
    const itemCount = this.repository.get(name);
    if (itemCount) itemCount.increaseCount();
  }
}
