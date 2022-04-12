class Sponge {
  constructor() {
    this.maxLevel = 4;
    this.material = new THREE.MeshPhongMaterial({ color: 0x999999 });
    this.currentSize = Math.pow(3, this.maxLevel);
    this.cubesSpacing = 1;
    this.cubesPositions = ['0,0,0'];

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
    const generatedPositions = [];
    const generatedGeometries = [];

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
          generatedPositions.push(`${newX},${newY},${newZ}`);
          generatedGeometries.push(geometry);
        }
      }
    }

    return [generatedPositions, generatedGeometries];
  }

  next() {
    if (this.currentSize <= 1) {
      return;
    }

    console.log(`Generating new set of ${this.cubesPositions.length * 20}`);

    const start = new Date();
    let newPositions = [];
    let newGeometries = [];

    scene.remove(this.form);

    this.currentSize = this.currentSize / 3;
    this.cubesPositions.forEach((position) => {
      const [positions, geometries] = this.generate(position);

      newPositions = newPositions.concat(positions);
      newGeometries = newGeometries.concat(geometries);
    });

    this.cubesPositions = newPositions;
    this.form = new THREE.Mesh(
      THREE.BufferGeometryUtils.mergeBufferGeometries(newGeometries),
      this.material
    );

    scene.add(this.form);
    console.log(`Done in ${(new Date() - start) / 1000} seconds`);
  }
}
