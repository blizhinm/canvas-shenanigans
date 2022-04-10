class Sponge {
  constructor() {
    this.material = new THREE.MeshPhongMaterial({ color: 0x999999 });
    this.currentSize = 27;
    this.cubes = [];

    const cube = this.createCube(this.currentSize, [0, 0, 0]);

    scene.add(cube);
    this.cubes.push(cube);

    camera.position.z = this.currentSize * 1.75;
  }

  createCube(size, position) {
    if (!size) {
      size = 1;
    }

    const newCube = new THREE.Mesh(
      new THREE.BoxGeometry(size, size, size),
      this.material
    );

    if (position) {
      newCube.position.set(...position);
    }

    return newCube;
  }

  generate(rootCube) {
    const generatedCubes = [];

    for (let x = -1; x <= 1; x += 1) {
      const absX = Math.abs(x);

      for (let y = -1; y <= 1; y += 1) {
        const absY = Math.abs(y);

        for (let z = -1; z <= 1; z += 1) {
          const absZ = Math.abs(z);

          if ([0, 1].includes(absX + absY + absZ)) {
            continue;
          }

          const cube = this.createCube(this.currentSize, [
            x * this.currentSize + rootCube.position.x,
            y * this.currentSize + rootCube.position.y,
            z * this.currentSize + rootCube.position.z,
          ]);

          generatedCubes.push(cube);
        }
      }
    }

    scene.remove(rootCube);
    scene.add(...generatedCubes);

    return generatedCubes;
  }

  next() {
    if (this.currentSize <= 1) {
      return;
    }

    let newCubes = [];

    this.currentSize = this.currentSize / 3;
    this.cubes.forEach((cube) => {
      newCubes = newCubes.concat(this.generate(cube));
    });

    this.cubes = newCubes;
  }
}
