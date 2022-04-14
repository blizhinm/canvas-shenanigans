class Sponge {
  constructor() {
    this.maxLevel = 4;
    this.material = new THREE.MeshPhongMaterial({ color: 0x999999 });
    this.currentSize = Math.pow(3, this.maxLevel);
    this.cubesSpacing = 1;
    this.cubesPositions = ['0,0,0'];
    this.cubesPositionsSwap = [];
    this.geometries = [];

    this.form = new THREE.Mesh(
      new THREE.BoxBufferGeometry(this.currentSize, this.currentSize, this.currentSize),
      this.material
    );

    scene.add(this.form);
    camera.position.z = this.currentSize * 1.75;
  }

  generate(rootCubePosition) {
    const [rx, ry, rz] = rootCubePosition.split(',');
    const rootX = parseInt(rx, 10);
    const rootY = parseInt(ry, 10);
    const rootZ = parseInt(rz, 10);

    for (let x = -1; x <= 1; x += 1) {
      const absX = Math.abs(x);
      const newX = x * this.cubesSpacing * this.currentSize + rootX;

      for (let y = -1; y <= 1; y += 1) {
        const absY = Math.abs(y);
        const newY = y * this.cubesSpacing * this.currentSize + rootY;

        for (let z = -1; z <= 1; z += 1) {
          const absZ = Math.abs(z);
          const sum = absX + absY + absZ;

          if (sum === 0 || sum === 1) {
            continue;
          }

          const newZ = z * this.cubesSpacing * this.currentSize + rootZ;
          const geometry = new THREE.BoxBufferGeometry(
            this.currentSize,
            this.currentSize,
            this.currentSize
          );

          geometry.translate(newX, newY, newZ);
          this.cubesPositionsSwap.push(`${newX},${newY},${newZ}`);
          this.geometries.push(geometry);
        }
      }
    }
  }

  next() {
    if (this.currentSize <= 1) {
      return;
    }

    const start = new Date();
    console.log(
      `${start.toLocaleTimeString()} --- Generating new set of ${
        this.cubesPositions.length * 20
      }`
    );

    scene.remove(this.form);

    this.geometries = [];
    this.currentSize = this.currentSize / 3;
    this.cubesPositions.forEach((position) => this.generate(position));

    this.form = new THREE.Mesh(
      THREE.BufferGeometryUtils.mergeBufferGeometries(this.geometries),
      this.material
    );

    this.cubesPositions = this.cubesPositionsSwap;
    this.cubesPositionsSwap = [];

    scene.add(this.form);

    const end = new Date();
    console.log(
      `${end.toLocaleTimeString()} --- Done in ${(end - start) / 1000} seconds`
    );
  }
}
