import { useEffect, useRef } from "react";
import * as THREE from "three";

const Cube = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Criar o renderizador e associá-lo ao DOM
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Configurar câmera
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // Criar cena
    const scene = new THREE.Scene();

    // Adicionar luz
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // Criar geometria do cubo
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: '#20B2AA' });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Função de animação
    const animate = (time) => {
      time *= 0.001; // converter tempo para segundos
      cube.rotation.x = time;
      cube.rotation.y = time;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Ajustar tamanho da tela ao redimensionar
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Cube;
