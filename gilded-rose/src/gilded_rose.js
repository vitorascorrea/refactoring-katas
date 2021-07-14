class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class GildedRoseItem {
  constructor(item) {
    if (this.constructor === GildedRoseItem) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.name = item.name;
    this.sellIn = item.sellIn;
    this.quality = item.quality;
    this.originalItem = item;
  }

  updateQuality() {
    this.updateSpecificQuality();
    this.originalItem.sellIn = this.sellIn;
    this.originalItem.quality = this.quality;
  }

  updateSpecificQuality() {
    throw new Error("Method 'updateQuality()' must be implemented.");
  }
}

class AgedBrieItem extends GildedRoseItem {
  updateSpecificQuality() {
    this.sellIn -= 1;
    const sellInMultiplier = this.sellIn >= 0 ? 1 : 2;
    if (this.quality < 50) this.quality += 1 * sellInMultiplier;
  }
}

class BackstagePassesItem extends GildedRoseItem {
  updateSpecificQuality() {
    this.sellIn -= 1;
    if (this.sellIn < 0) this.quality = 0;
    else if (this.quality < 50) {
      if (this.sellIn <= 5 && this.quality + 3 <= 50) this.quality += 3;
      else if (this.sellIn <= 10 && this.quality + 2 <= 50) this.quality += 2;
      else this.quality += 1;
    }
  }
}

class ConjuredItem extends GildedRoseItem {
  updateSpecificQuality() {
    this.sellIn -= 1;
    const sellInMultiplier = this.sellIn >= 0 ? 1 : 2;
    if (this.quality > 0 && this.quality < 50) this.quality -= 2 * sellInMultiplier;
  }
}

class SulfurasItem extends GildedRoseItem {
  updateSpecificQuality() {
    //
  }
}

class DefaultItem extends GildedRoseItem {
  updateSpecificQuality() {
    this.sellIn -= 1;
    const sellInMultiplier = this.sellIn >= 0 ? 1 : 2;
    if (this.quality > 0) this.quality -= 1 * sellInMultiplier;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items.map(item => this.getItemClass(item));
  }

  getItemClass(item) {
    let instantializer = DefaultItem;

    if (item.name.includes('Aged Brie')) {
      instantializer = AgedBrieItem;
    } else if (item.name.includes('Backstage passes')) {
      instantializer = BackstagePassesItem;
    } else if (item.name.includes('Sulfuras')) {
      instantializer = SulfurasItem;
    } else if (item.name.includes('Conjured')) {
      instantializer = ConjuredItem;
    }

    return new instantializer(item);
  }

  updateQuality() {
    this.items.forEach((item) => {
      item.updateQuality();
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
