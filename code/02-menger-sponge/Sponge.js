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

  generate(rootCube, rootCubeIndex) {
    const generatedCubes = [];
    let cubesCopy = [...this.cubes];

    for (
      let x = rootCube.position.x - this.currentSize;
      x <= rootCube.position.x + this.currentSize;
      x += this.currentSize
    ) {
      for (
        let y = rootCube.position.y - this.currentSize;
        y <= rootCube.position.y + this.currentSize;
        y += this.currentSize
      ) {
        for (
          let z = rootCube.position.z - this.currentSize;
          z <= rootCube.position.z + this.currentSize;
          z += this.currentSize
        ) {
          if (
            (x === rootCube.position.x &&
              y === rootCube.position.y &&
              z === rootCube.position.z) ||
            (x === rootCube.position.x + this.currentSize &&
              y === rootCube.position.y &&
              z === rootCube.position.z) ||
            (x === rootCube.position.x &&
              y === rootCube.position.y + this.currentSize &&
              z === rootCube.position.z) ||
            (x === rootCube.position.x &&
              y === rootCube.position.y &&
              z === rootCube.position.z + this.currentSize) ||
            (x === rootCube.position.x &&
              y === rootCube.position.y &&
              z === rootCube.position.z) ||
            (x === rootCube.position.x - this.currentSize &&
              y === rootCube.position.y &&
              z === rootCube.position.z) ||
            (x === rootCube.position.x &&
              y === rootCube.position.y - this.currentSize &&
              z === rootCube.position.z) ||
            (x === rootCube.position.x &&
              y === rootCube.position.y &&
              z === rootCube.position.z - this.currentSize)
          ) {
            continue;
          }

          const cube = this.createCube(this.currentSize, [x * 1, y * 1, z * 1]);

          generatedCubes.push(cube);
        }
      }
    }

    scene.remove(rootCube);
    scene.add(...generatedCubes);

    cubesCopy.splice(rootCubeIndex, 1);
    cubesCopy = cubesCopy.concat(generatedCubes);

    return cubesCopy;
  }

  next() {
    let newCubes = [];

    this.currentSize = this.currentSize / 3;
    this.cubes.forEach((cube, index) => {
      newCubes = newCubes.concat(this.generate(cube, index));
    });

    this.cubes = newCubes;
  }
}
