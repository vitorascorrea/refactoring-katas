const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should have sellIn value", () => {
    const gildedRose = new Shop([new Item("foo", 10, 10)]);
    expect(gildedRose.items[0].sellIn).toBeDefined();
  });

  it("should have quality value", () => {
    const gildedRose = new Shop([new Item("foo", 10, 10)]);
    expect(gildedRose.items[0].quality).toBeDefined();
  });

  it("should have decreased values for default item", () => {
    let gildedRose = new Shop([new Item("foo", 10, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);

    gildedRose = new Shop([new Item("foo", 10, 100)]);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(99);
  });

  it("should have decreased quality twice as fast for default item if sell date passed", () => {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
  });

  it("should never have negative quality", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).not.toEqual(-1);
  });

  it("aged brie should increase quality over time", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 0)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
    items = gildedRose.updateQuality();
    // After sellIn, quality should increase twice as fast
    expect(items[0].quality).toEqual(3);
  });

  it("aged brie quality shouldn't be more than 50", () => {
    let gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);

    gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("backstage passes quality shouldn't be more than 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("sulfuras quality is always 80", () => {
    let gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);

    gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });

  it("backstage pass quality increase twice as fast", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(11);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(13);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(15);

    gildedRose.items[0].sellIn = 3;
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(18);

    gildedRose.items[0].sellIn = 0;
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("conjured items quality decrease twice as fast", () => {
    let gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);

    gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 6)]);
    items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });
});
