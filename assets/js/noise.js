const P_VALUES = [
  151,160,137,91,90,15,
  131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
  190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
  88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
  77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
  102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
  135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
  5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
  223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
  129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
  251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
  49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
];

class noise2D {
  constructor() {
    // this.permutation = P_VALUES.concat(P_VALUES);
    this.permutation = [];

    for (let i = 0; i < 512; i += 1) {
      this.permutation.push(Math.floor(Math.random() * 255));
    }
  }

  noise(x, y) {
    const xi = Math.floor(x) & 255;
    const yi = Math.floor(y) & 255;
    
    const g1 = this.permutation[this.permutation[xi] + yi];
    const g2 = this.permutation[this.permutation[xi + 1] + yi];
    const g3 = this.permutation[this.permutation[xi] + yi + 1];
    const g4 = this.permutation[this.permutation[xi + 1] + yi + 1];

    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const d1 = this.grad(g1, xf, yf);
    const d2 = this.grad(g2, xf - 1, yf);
    const d3 = this.grad(g3, xf, yf - 1);
    const d4 = this.grad(g4, xf - 1, yf - 1);

    const u = this.fade(xf);
    const v = this.fade(yf);

    const x1Inter = this.lerp(u, d1, d2);
    const x2Inter = this.lerp(u, d3, d4);
    const yInter = this.lerp(v, x1Inter, x2Inter);

    return yInter;
  }

  grad(hash, x, y) {
    switch(hash & 3) {
      case 0: return x + y;
      case 1: return -x + y;
      case 2: return x - y;
      case 3: return -x - y;
      default: return 0;
    }
  }
  
  fade(t) {
    // return (6 * Math.pow(t, 5)) - (15 * Math.pow(t, 4)) + (10 * Math.pow(t, 3));
    return t * t * t * (t * (t * 6 - 15) + 10);
    // return t;
  }

  lerp(amount, left, right) {
    return (right - left) * amount + left;
  }
}
