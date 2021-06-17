const { Box, Circle, Line, Graphic, GraphicData } = require('../src/jszpl.js');
const testHelpers = require('./test-helpers.js');
const PNG = require('pngjs').PNG;

test('add box to a label', () => {
  const label = testHelpers.createLabel();

  const box = new Box();
  label.content.push(box);
  box.fill = true;
  box.width = 150;
  box.height = 150;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^GB150,150,150,,0^FS
^XZ`);
});

test('add circle to a label', () => {
  const label = testHelpers.createLabel();

  const circle = new Circle();
  label.content.push(circle);
  circle.fill = true;
  circle.width = 150;
  circle.height = 150;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^GC150,150,B^FS
^XZ`);
});

test('add box overlapping circle to a label', () => {
  const label = testHelpers.createLabel();

  const circle = new Circle();
  label.content.push(circle);
  circle.fill = true;
  circle.width = 150;
  circle.height = 150;

  const box = new Box();
  label.content.push(box);
  box.fill = true;
  box.width = 150;
  box.height = 150;
  box.invert = true;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10^GC150,150,B^FS
^FO10,10^FR^GB150,150,150,,0^FS
^XZ`);
});

test('add lines to a label', () => {
  const label = testHelpers.createLabel();

  const line1 = new Line();
  label.content.push(line1);
  line1.x1 = 50;
  line1.y1 = 50;
  line1.x2 = 150;
  line1.y2 = 150;
  line1.thickness = 5;

  const line2 = new Line();
  label.content.push(line2);
  line2.x1 = 50;
  line2.y1 = 150;
  line2.x2 = 150;
  line2.y2 = 50;
  line2.thickness = 5;

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO60,60^GD100,100,5,B,L^FS
^FO60,60^GD100,100,5,B,R^FS
^XZ`);
});

test('add image to a label', () => {
  const label = testHelpers.createLabel();

  const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAG4AAABsCAYAAACLk4fwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABcGSURBVHhe7d0FnHRV+QdwkJaSUjqkJKRTWkIUJJSSbilpBGlQJAXBoASlpUOlpJQQJVQaVLpDBVSa+/9/z7vPevbund25M/O+7Lrz+3yez07cuXP3/O55+pwZq+hiWKJL3DBFl7hhii5xwxRd4oYpPjLi/v3vfxePP/548f777/e80kUd1Cbu6aefLlZdddUkW221VXHwwQcXf/3rX4tnnnmm54jG+M9//lNcddVV6bMLL7xwseSSSxbvvvtu8a9//Sudg7zwwgs9R3cxEGoT9/DDDxdjjTVWksUWW6xYd911i5/+9KfFJZdcUnz9618v7rjjjuKdd97pOXoUzK5f//rXieT55puv9/Nrrrlm8eabbxZLLbVUej7JJJMUp5xySjrPfvvt1yVxALRFXIgBv/7664u33367uOuuu4p99tmn+OMf/9jziaK44oorii233DI9XmmllXo/t+KKK6ZZ5/Gkk05a3H333ekY2GGHHYq99tqr51kXZXSEuJB11lknkQfXXHNNsd1226XZR6UGZphhhn6fQ9o999zTc8Qoom+55Zau/RsAtYljpxZccMF+gx+ywAILFLfeems69uKLLy423XTTYpNNNknPoYq4P/zhD+m9f/7zn8Wll15aPPTQQ+l5jvvvv7+47777ki01G7fddtukYs1Y8sEHH/QcOTJQmzi4+uqr+w1+LlRnkMf2feELX0iPoUwcYt9777303gorrFA88MAD6TH8/e9/L37+858nku68886khq+88spEFPs69thjp3NMM800XeKaATd+4okn7kNAWczKUJts1WOPPZYe58RNPvnkxT/+8Y/0+o033phsY4CTcuSRRxZPPvlken7vvfcWiy++eC9Zuey6667pmJGEloiD3/zmN4OS97WvfS0de9NNNxXnnntuepwTt+yyyyY1acbtvvvuvTbtwgsvTI6KWfTqq68W3//+9ysJC2kmFPlfQ8vEwW9/+9sByfv4xz+e4j5x2hxzzFHMO++8xRJLLFH86le/Ks4444w0Uxw399xzF5/4xCcSwT/4wQ96Z+crr7xSzDbbbP3Om8u3vvWtdOxIQ1vE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';
  const imageBuffer = new Buffer.from(base64Image, 'base64');
  const imageData = PNG.sync.read(imageBuffer);

  const graphic = new Graphic();
  label.content.push(graphic);
  graphic.width = 200;
  graphic.height = 200;

  let index = 0;
  const imageBits = [];

  for (var y = 0; y < imageData.height; y++) {
    for (var x = 0; x < imageData.width; x++) {

      var red = imageData.data[index++];
      var green = imageData.data[index++];
      var blue = imageData.data[index++];
      var opacity = imageData.data[index++];

      var value = 0;

      if (opacity != 0) {
        value = (((red + green + blue) / 3) < 180) ? 1 : 0;
      }

      imageBits.push(value);
    }
  }

  graphic.data = new GraphicData(110, 108, imageBits);

  const zpl = label.generateZPL();

  expect(zpl).toBe(`^XA
^FO10,10
^FO10,10^GFA,5000,5000,25,,:::::::::::L0GFGEJ0G1GFGE,L0IFG8H0G3GFGEHFGE,:L0HFG8G1G0G3GDIFG0G3G8,:L0IFG8H3G1HFGCG0GC,:L0IFGEG3GFG1HFG0G3I0G3GFGE,:L0G3IFG0GFG1HFG0GCG0G7G8HFGE,:L0G3IFGCG3G1GFGEG0GCG3G8G1HFGE,:M0JFG0GDGFGEG3G0GCG1IFGC,M0G3IFG0GFG9HFG3G0G7IFGC,:M0G1IFGCGDHFG0G3GDJF,:M0G1IFGCG2J0G3IF,:M0G1G8G7GFH0G7GFG0G3IF,:P0GCG0G3HFH0G3GE,:M0G2G0G7N0G6,:M0G3GFGEG3M0G6,M0HFGEG3G0G1GEG1H0GFGE,:M0GFGEG6GCG0G3HFGCG0GEG7G8,:M0GCG7G8GCG0G3G8G0GCG0GCG1GF,:M0G1GFG9GCG0G2G1G8GCG0GFG9GE,:N0G7G9GCH0G1GEGCG0G3G9G8,:L0G3HFG9GCG0G1G8G1H0G3GE,L0G3HFG9GFH0G7GEH0G1GE,:L0G3HFG8GFM0G6,:L0G3GEG7GEG3JFI0G1G8,:L0G3G2G1GFG0IFG9GFG0IFGC,:M0GEG0G7KFG0KFGC,:M0GFG8G1JFG8G3LF,:M0HFG8G3GFGEG7G8MFGC,L0G3HFGEH0G1GEG6MFGC,:L0G3G1IFH0G6G1MF,:L0G3G0G1JFG8G0LFGC,:L0GFGEH0IFG8G0G3KFGC,:L0HFGEM0KFGC,:L0MFG8H0KFGC,:K0G3G0G3KFG8H0LF,K0G3H0G1JFGEH0KFGC,:K0G3L0G3GEH0G3IFGC,:K0G3K0HFGEI0GFGE,:K0GCI0G7IFG9G8,:K0MFG1GFGE,:K0KFH0G3HF,:K0GCK0G3IFGC,K0GCJ0G3HFG8G7GFGC,:K0GCI0G1HFGCG1JFG8,:K0GCH0G7HFGCG0G7GFG0KFG3GFG9HFGC,:K0KFH0G3GFGEG3HFGEG7GCG3GEG1JFGE,:K0IFGEI0HFG8HFG3GEG1GCG3GCG7GEGFGCG1HF,:K0GCK0G3GFGEG0GFGCG3GEG1GCG3GCG7HFGCG3HFGC,K0GFJ0G3HFG8G1GFG0G3GEG1GCG3GDGFG9GFG0HFGEG0GC,:K0G3J0HFGCG0G7GCG0G3GEG1GCH3GEG7GFG3GEI0G3,:K0G3I0G7HFG0G7GFH0G3GEG1GFG0G3GEG7GCGFH0G7HFGC,:K0G3H0G1HFG0G1GFGEH0G1GEG1GFG0GFG9GFHCG1JFGE,:M0G1HFH0GFGEI0G1GFG9GFG0GEG1GFH0GFGEI0GE,:L0GCHFG8G0G3GEG6I0G1GFG8HFGEG7GFG0GFK0G1G8,:L0G3GEH0G3GFGDJFG0G7G8HFGCG7GEH0G3JFGDGE,L0G3I0HFG1LFG8HFGDGFG8G0MFGES0GC,:M0GCG0G1GFG0G3GFG8G0IFG8HFG3GEG6HFGEH0JFG8R0GC,:M0GEG0G7GCG0G2J0G3GFG8HFG3IFL0HFG8Q0G3GC,:M0G2G1GFM0G2G7G8GFGCIFM0G3GFG8L0LFGC,:M0G1GFGEH0HFGEH0G2G7G8GFGCHFG8G0G3IFGCG0G1GFGEK0MFGC,:M0G1GFGEH0JFG3GDGFG8GFGCGFG8G1MFG1GEG6J0G1MF,:N0G7GEH0JFGCGDGFG9GFG3GFG9PFGEJ0G1LFGC,N0G7GFGCJ0HFG1GFG9GFG3HFGEJ0G1JFGEJ0G7KFGC,:N0G7HFG3GFG8G0G3GCG3GEG1GFG3GFG8M0HFGEK0G7KFGC,:N0G1LFG0GCG3GEG1GCG3GFG8N0GEG6G1J0G7KF,:L0G3GEG7IFG0G1GFG3G0GFG8G7GCG3GFG8G1KFH0GCG6G7J0G1JFG8,:L0GCG1GEG0HFGCG0G7GCG0GFG8G7GCG3PFG0G1GFJ0G1G3,:M0G1GEG0GFG0GEG0G1GFG3GEG0G7GCG3IFGCG0G1IFGCG0G1GEGCJ0GF,:M0G1GEG0GFG0G3G8G7G0GFGEG1GFG0G3GEG6K0G1GFH0G1G8GCJ0GFGC,M0G1GEG0GFG0G3GEG6I0G7HFG3GEG6K0G1I0G1G8GFJ0HC,:J0G6H0JFGCG3GFG8K0JFG8G3IFGEJ0G7GFJ0HC,:J0G6G0GCI0IFGEM0IFGEJFGEJ0G7G0GCI0GFGC,:I0G1G9GFJ0G3HFGEM0G3KFGCG0G1J0G1HCI0GFGC,:I0G6G1L0HFGEN0JFGCG0G1GFGCI0G1HFH0G1,:H0G1G8G6L0HFGEN0G3IFG0G1GFG8G3GCI0HFGEG1HF,I0G1GEL0HFG8O0G7IFG3GEG0HFI0G3GCG3GEG1GC,:H0G2N0HFG8O0G1HFGCGFG8G1GFG0GEI0G3IF,:H0G2N0G3GFG8O0G7HFGCG1GEG7GCG0G2,:H0G1GEM0G3GFGEO0G7HFH0G1GFH0G1G8,:I0G1GFGCK0G3GFGEN0G1HFGCI0G1GCG0G3G8,:I0G1G8G3GFJ0G3GFGEN0G3HFK0G3G0G2,:J0G6G3GFJ0G3GFGEN0HFGEK0G3G0GC,J0G6HFJ0G3GFGEM0G3HFG8K0G3G0GC,:J0G7HFK0GFGEM0G3GFGEL0GCG0GC,:J0G1HFK0G3GEM0GFGEM0GCG3,:J0G1GFGCK0G3GEL0G3GFGEM0GCG3,:J0G1GFL0G3GFG8K0HFGEM0GCG3,:K0GCL0G3GFG8J0G1HFGCM0HC,:R0G1GFG8J0G7HFN0HC,R0G1GFG8I0G7GFGCN0G1G3GC,:R0G3GFG8H0G3HFGCN0G1G0GC,:R0HFG8H0IFGCN0G6G0GC,:R0HFG8G0G3IFGCM0G1G8G0GC,:Q0G3GFG8I0HFGEN0G7G8GF,:P0G3GFGET0G1GEG1,:P0HFGET0GFGEG1,O0G7IFG8R0G3IF,:O0G7HFGES0JFGC,:O0G1HFT0G3HFGE,:,::::^FS
^XZ`);
});