import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

import Sponge from './Sponge';

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
const directionalLight1 = new DirectionalLight(0xffffff, 1);
const directionalLight2 = new DirectionalLight(0xffffff, 0.85);
const directionalLight3 = new DirectionalLight(0xffffff, 0.7);
const directionalLight4 = new DirectionalLight(0xffffff, 0.55);
const directionalLight5 = new DirectionalLight(0xffffff, 0.4);
const directionalLight6 = new DirectionalLight(0xffffff, 0.25);

directionalLight1.position.set(30, 0, 0);
directionalLight2.position.set(-30, 0, 0);
directionalLight3.position.set(0, 30, 0);
directionalLight4.position.set(0, -30, 0);
directionalLight5.position.set(0, 0, 30);
directionalLight6.position.set(0, 0, -30);

scene.add(
  ambientLight,
  directionalLight1,
  directionalLight2,
  directionalLight3,
  directionalLight4,
  directionalLight5,
  directionalLight6
);

(function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
})();

const sponge = new Sponge(scene, camera);

window.addEventListener('dblclick', () => {
  sponge.next();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
