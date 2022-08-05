import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  PlaneBufferGeometry,
  MeshPhongMaterial,
  DoubleSide,
  Mesh,
} from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import { degreesToRadians } from '../helpers';

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#222');
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new TrackballControls(camera, renderer.domElement);
controls.noPan = true;

const ambientLight = new AmbientLight(0xffffff, 0.25);
const directionalLight = new DirectionalLight(0xffffff, 0.75);
directionalLight.position.set(0, -100, 0);
scene.add(ambientLight, directionalLight);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const PLANE_WIDTH = 50;
const PLANE_HEIGHT = PLANE_WIDTH;

const geom = new PlaneBufferGeometry(
  PLANE_WIDTH,
  PLANE_HEIGHT,
  Math.round(PLANE_WIDTH * 0.5),
  Math.round(PLANE_HEIGHT * 0.5)
);
const mat = new MeshPhongMaterial({
  color: 0x999999,
  side: DoubleSide,
  wireframe: true,
  // transparent: true,
  opacity: 0.75,
});
const plane = new Mesh(geom, mat);

scene.add(plane);

camera.position.z = PLANE_HEIGHT;
plane.rotateX(degreesToRadians(130));

let num = 1;

(function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();

  for (let i = 0; i < plane.geometry.attributes.position.array.length; i += 1) {
    const array = plane.geometry.attributes.position.array;

    if (i % 3 === 0) {
      // array[i] = Math.sin(array[i] + num);
    } else if (i % 3 === 1) {
      // array[i] = Math.cos(Math.pow((array[i - 2] + array[i - 1]) / num, 1));
    } else if (i % 3 === 2) {
      array[i] = Math.sin(
        num -
          (array[i - 2] * array[i - 2] * array[i - 2] +
            array[i - 1] * array[i - 1] * array[i - 1] +
            array[i] * array[i] * array[i]) /
            i
      );
    }
  }

  plane.geometry.attributes.position.needsUpdate = true;
  num += 0.1;
})();

plane.geometry.attributes.position.needsUpdate = true;
