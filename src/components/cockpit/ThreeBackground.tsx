import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Subtle monochrome 3D background:
 * - Rotating wireframe icosahedron (architectural)
 * - Floating particle field
 * - Reacts to mouse + scroll
 * Fits the architectural-minimalist aesthetic (white on near-black).
 */
export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- Wireframe icosahedron group ---
    const group = new THREE.Group();
    scene.add(group);

    const geo = new THREE.IcosahedronGeometry(2.4, 1);
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xf4f4f4, transparent: true, opacity: 0.22 })
    );
    group.add(wire);

    const innerGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const innerWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(innerGeo),
      new THREE.LineBasicMaterial({ color: 0xf4f4f4, transparent: true, opacity: 0.35 })
    );
    group.add(innerWire);

    // --- Particle field ---
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.018,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // --- Interaction ---
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      group.rotation.x = t * 0.08 + mouse.y * 0.3;
      group.rotation.y = t * 0.12 + mouse.x * 0.4;
      innerWire.rotation.x = -t * 0.2;
      innerWire.rotation.y = -t * 0.15;

      group.position.y = -scrollY * 0.0015;

      points.rotation.y = t * 0.02;
      points.rotation.x = mouse.y * 0.1;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      innerGeo.dispose();
      pGeo.dispose();
      pMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 40%, black 40%, transparent 100%)",
      }}
    />
  );
}
