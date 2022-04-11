const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#222');
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.noPan = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.85);
const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.7);
const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.55);
const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.4);
const directionalLight6 = new THREE.DirectionalLight(0xffffff, 0.25);

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

const sponge = new Sponge();

window.addEventListener('dblclick', () => {
  sponge.next();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});
