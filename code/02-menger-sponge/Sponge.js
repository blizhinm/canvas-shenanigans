class Sponge {
  constructor() {
    this.material = new THREE.MeshPhongMaterial({ color: 0x999999 });
    this.currentSize = 81;
    this.cubesSpacing = 1;
    this.cubesPositions = ['0,0,0'];

    this.form = new THREE.Mesh(
      new THREE.BoxBufferGeometry(this.currentSize, this.currentSize, this.currentSize),
      this.material
    );

    scene.add(this.form);
    camera.position.z = this.currentSize * 1.75;
  }

  generate(
    /** @type {THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial>} */
    rootCubePosition
  ) {
    const [rootX, rootY, rootZ] = rootCubePosition.split(',');
    const generatedPositions = [];
    const generatedGeometries = [];

    for (let x = -1; x <= 1; x += 1) {
      const absX = Math.abs(x);

      for (let y = -1; y <= 1; y += 1) {
        const absY = Math.abs(y);

        for (let z = -1; z <= 1; z += 1) {
          const absZ = Math.abs(z);

          if ([0, 1].includes(absX + absY + absZ)) {
            continue;
          }

          const newX = x * this.cubesSpacing * this.currentSize + parseInt(rootX, 10);
          const newY = y * this.cubesSpacing * this.currentSize + parseInt(rootY, 10);
          const newZ = z * this.cubesSpacing * this.currentSize + parseInt(rootZ, 10);
          const geometry = new THREE.BoxBufferGeometry(
            this.currentSize,
            this.currentSize,
            this.currentSize
          );

          geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(
              geometry.attributes.position.array.map((coor, index) => {
                if (index % 3 === 0) {
                  return coor + newX;
                } else if (index % 3 === 1) {
                  return coor + newY;
                } else if (index % 3 === 2) {
                  return coor + newZ;
                }
              }),
              3
            )
          );

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

    this.currentSize = this.currentSize / 3;
    this.cubesPositions.forEach((position) => {
      const [positions, geometries] = this.generate(position);

      newPositions = newPositions.concat(positions);
      newGeometries = newGeometries.concat(geometries);
    });

    if (this.form) {
      scene.remove(this.form);
    }

    this.cubesPositions = newPositions;
    this.form = new THREE.Mesh(
      THREE.BufferGeometryUtils.mergeBufferGeometries(newGeometries),
      this.material
    );

    scene.add(this.form);
    console.log(`Done in ${(new Date() - start) / 1000} seconds`);
  }
}
