import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Advanced cyber 3D hero (Three.js):
 * dual cores, multi rings, DNA helix, satellites, cubes, scroll/mouse parallax,
 * idle camera orbit, energy pulse, matrix-style particle rain.
 */
export default function Hero3D({ className = '' }) {
  const mountRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = mount.clientWidth || window.innerWidth
    let h = mount.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050806, 0.024)

    const camera = new THREE.PerspectiveCamera(48, w / h, 0.1, 120)
    camera.position.set(0, 0.55, 9.2)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    mount.appendChild(renderer.domElement)
    Object.assign(renderer.domElement.style, {
      width: '100%',
      height: '100%',
      display: 'block',
    })

    scene.add(new THREE.AmbientLight(0x0a2a18, 1.1))
    const key = new THREE.PointLight(0x00ff55, 3.2, 55)
    key.position.set(4, 5, 6)
    scene.add(key)
    const fill = new THREE.PointLight(0x00d9ff, 2.0, 45)
    fill.position.set(-5, -2, 4)
    scene.add(fill)
    const violet = new THREE.PointLight(0xa78bfa, 1.25, 40)
    violet.position.set(0, 3, -5)
    scene.add(violet)
    const rim = new THREE.PointLight(0x00ff55, 0.9, 30)
    rim.position.set(0, -4, 2)
    scene.add(rim)

    const group = new THREE.Group()
    scene.add(group)

    // Primary wireframe core
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00ff55,
      emissive: 0x00ff55,
      emissiveIntensity: 0.45,
      metalness: 0.75,
      roughness: 0.18,
      wireframe: true,
      transparent: true,
      opacity: 0.95,
    })
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.45, 1), coreMat)
    group.add(core)

    // Secondary counter-rotating shell
    const core2Mat = new THREE.MeshStandardMaterial({
      color: 0x00d9ff,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    })
    const core2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.1, 0), core2Mat)
    group.add(core2)

    // Inner energy sphere (pulsing)
    const energy = new THREE.Mesh(
      new THREE.SphereGeometry(0.58, 40, 40),
      new THREE.MeshBasicMaterial({ color: 0x00ff55, transparent: true, opacity: 0.2 })
    )
    group.add(energy)

    // Soft glow sphere
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0x00ff55,
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
      })
    )
    group.add(glow)

    // Outer lattice shell
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.15, 0),
      new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      })
    )
    group.add(shell)

    // Equatorial rings (screenshot-style multi-orbit)
    const makeRing = (r, color, opacity, rx, ry, tube = 0.016) => {
      const m = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 12, 160), m)
      mesh.rotation.x = rx
      mesh.rotation.y = ry
      group.add(mesh)
      return mesh
    }
    const ring1 = makeRing(2.5, 0x00ff55, 0.48, Math.PI / 2.25, 0, 0.02)
    const ring2 = makeRing(2.95, 0x00d9ff, 0.35, Math.PI / 3.1, 0.75, 0.015)
    const ring3 = makeRing(3.4, 0xa78bfa, 0.24, Math.PI / 2.0, -0.55, 0.014)
    const ring4 = makeRing(3.9, 0x00ff55, 0.14, Math.PI / 3.8, 1.15, 0.012)
    const ring5 = makeRing(4.35, 0x00d9ff, 0.1, Math.PI / 2.6, -1.0, 0.01)

    // Orbiting satellites (mixed geometry)
    const sats = []
    for (let i = 0; i < 16; i++) {
      const geo =
        i % 4 === 0
          ? new THREE.OctahedronGeometry(0.11, 0)
          : i % 4 === 1
            ? new THREE.TetrahedronGeometry(0.13, 0)
            : i % 4 === 2
              ? new THREE.BoxGeometry(0.12, 0.12, 0.12)
              : new THREE.IcosahedronGeometry(0.09, 0)
      const col = i % 3 === 0 ? 0x00ff55 : i % 3 === 1 ? 0x00d9ff : 0xa78bfa
      const mat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.85,
        metalness: 0.55,
        roughness: 0.22,
      })
      const sat = new THREE.Mesh(geo, mat)
      sat.userData = {
        a: (i / 16) * Math.PI * 2,
        r: 3.6 + (i % 5) * 0.32,
        speed: 0.35 + (i % 6) * 0.12,
        yOff: ((i % 6) - 2.5) * 0.28,
        spin: 0.02 + (i % 4) * 0.01,
      }
      group.add(sat)
      sats.push(sat)
    }

    // Floating cubes (screenshot aesthetic)
    const cubes = []
    for (let i = 0; i < 22; i++) {
      const size = 0.08 + Math.random() * 0.14
      const mat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x00ff55 : i % 3 === 1 ? 0x00d9ff : 0xa78bfa,
        wireframe: i % 2 === 0,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.35,
      })
      const cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), mat)
      cube.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 10
      )
      cube.userData = {
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.003,
        vz: (Math.random() - 0.5) * 0.003,
        rx: (Math.random() - 0.5) * 0.02,
        ry: (Math.random() - 0.5) * 0.025,
      }
      scene.add(cube)
      cubes.push(cube)
    }

    // DNA helix (double spiral)
    const helixCount = prefersReduced ? 40 : 90
    const helixGeo = new THREE.BufferGeometry()
    const helixPos = new Float32Array(helixCount * 3)
    for (let i = 0; i < helixCount; i++) {
      const t = (i / helixCount) * Math.PI * 6
      const y = (i / helixCount) * 5.5 - 2.75
      helixPos[i * 3] = Math.cos(t) * 1.15
      helixPos[i * 3 + 1] = y
      helixPos[i * 3 + 2] = Math.sin(t) * 1.15
    }
    helixGeo.setAttribute('position', new THREE.BufferAttribute(helixPos, 3))
    const helix = new THREE.Points(
      helixGeo,
      new THREE.PointsMaterial({
        color: 0x00d9ff,
        size: 0.065,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    helix.position.x = -4.4
    scene.add(helix)

    const helix2Geo = helixGeo.clone()
    const h2 = helix2Geo.attributes.position.array
    for (let i = 0; i < helixCount; i++) {
      const t = (i / helixCount) * Math.PI * 6 + Math.PI
      h2[i * 3] = Math.cos(t) * 1.15
      h2[i * 3 + 2] = Math.sin(t) * 1.15
    }
    const helix2 = new THREE.Points(
      helix2Geo,
      new THREE.PointsMaterial({
        color: 0x00ff55,
        size: 0.06,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    helix2.position.x = 4.4
    scene.add(helix2)

    // Ambient star particles
    const pCount = prefersReduced ? 280 : 1600
    const pGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(pCount * 3)
    const colors = new Float32Array(pCount * 3)
    const cG = new THREE.Color(0x00ff55)
    const cC = new THREE.Color(0x00d9ff)
    const cV = new THREE.Color(0xa78bfa)
    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 18
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      const c = i % 6 === 0 ? cC : i % 9 === 0 ? cV : cG
      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.82,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
    scene.add(points)

    // Falling matrix particle columns
    const rainCount = prefersReduced ? 80 : 320
    const rainGeo = new THREE.BufferGeometry()
    const rainPos = new Float32Array(rainCount * 3)
    const rainVel = new Float32Array(rainCount)
    for (let i = 0; i < rainCount; i++) {
      rainPos[i * 3] = (Math.random() - 0.5) * 24
      rainPos[i * 3 + 1] = Math.random() * 14 - 2
      rainPos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2
      rainVel[i] = 0.02 + Math.random() * 0.05
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3))
    const rain = new THREE.Points(
      rainGeo,
      new THREE.PointsMaterial({
        color: 0x00ff55,
        size: 0.05,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    scene.add(rain)

    // Grid floor
    const grid = new THREE.GridHelper(32, 48, 0x00ff55, 0x0a6b32)
    grid.position.y = -3.2
    grid.material.transparent = true
    grid.material.opacity = 0.28
    scene.add(grid)

    // Energy pulse rings (expanding)
    const pulseRings = []
    for (let i = 0; i < 3; i++) {
      const pr = new THREE.Mesh(
        new THREE.TorusGeometry(1.2, 0.012, 8, 96),
        new THREE.MeshBasicMaterial({
          color: 0x00ff55,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        })
      )
      pr.rotation.x = Math.PI / 2
      pr.userData = { phase: i * 1.1 }
      group.add(pr)
      pulseRings.push(pr)
    }

    const mouse = { x: 0, y: 0 }
    const scroll = { t: 0 }
    const onPointer = (e) => {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scroll.t = Math.min(1, window.scrollY / Math.min(max, window.innerHeight * 1.2))
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const clock = new THREE.Clock()
    let running = true

    const animate = () => {
      if (!running) return
      rafRef.current = requestAnimationFrame(animate)
      if (document.hidden) return

      const elapsed = clock.getElapsedTime()
      const sp = prefersReduced ? 0.1 : 1
      const delta = Math.min(clock.getDelta(), 0.05)

      if (!prefersReduced) {
        // Core dual rotation
        core.rotation.y += 0.008 * sp
        core.rotation.x += 0.004 * sp
        core2.rotation.y -= 0.011 * sp
        core2.rotation.z += 0.005 * sp
        energy.scale.setScalar(1 + Math.sin(elapsed * 2.4) * 0.1)
        glow.scale.setScalar(1 + Math.sin(elapsed * 1.8) * 0.15)
        shell.rotation.y -= 0.0035 * sp
        shell.rotation.x += 0.0025 * sp

        // Orbit rings — multi-axis advanced motion
        ring1.rotation.z += 0.012 * sp
        ring1.rotation.x = Math.PI / 2.25 + Math.sin(elapsed * 0.3) * 0.08
        ring2.rotation.z -= 0.009 * sp
        ring2.rotation.y += 0.004 * sp
        ring3.rotation.y += 0.006 * sp
        ring3.rotation.z -= 0.003 * sp
        ring4.rotation.z += 0.007 * sp
        ring5.rotation.z -= 0.005 * sp
        ring5.rotation.x = Math.PI / 2.6 + Math.cos(elapsed * 0.25) * 0.12

        sats.forEach((sat) => {
          const u = sat.userData
          u.a += u.speed * 0.014 * sp
          sat.position.x = Math.cos(u.a) * u.r
          sat.position.z = Math.sin(u.a) * u.r
          sat.position.y = Math.sin(elapsed * 1.05 + u.a) * 0.55 + u.yOff
          sat.rotation.x += u.spin
          sat.rotation.y += u.spin * 1.2
        })

        cubes.forEach((cube) => {
          const u = cube.userData
          cube.position.x += u.vx * sp
          cube.position.y += u.vy * sp + Math.sin(elapsed + cube.position.x) * 0.0008
          cube.position.z += u.vz * sp
          cube.rotation.x += u.rx * sp
          cube.rotation.y += u.ry * sp
          // wrap bounds
          if (Math.abs(cube.position.x) > 8) cube.position.x *= -0.95
          if (Math.abs(cube.position.y) > 5) cube.position.y *= -0.95
          if (Math.abs(cube.position.z) > 7) cube.position.z *= -0.95
        })

        helix.rotation.y = elapsed * 0.4
        helix2.rotation.y = -elapsed * 0.4
        helix.position.y = Math.sin(elapsed * 0.5) * 0.15
        helix2.position.y = Math.cos(elapsed * 0.5) * 0.15
        points.rotation.y = elapsed * 0.045

        // Particle drift
        const pos = points.geometry.attributes.position.array
        for (let i = 1; i < pos.length; i += 12) {
          pos[i] += Math.sin(elapsed * 1.3 + i) * 0.0015
        }
        points.geometry.attributes.position.needsUpdate = true

        // Matrix rain fall
        const rp = rain.geometry.attributes.position.array
        for (let i = 0; i < rainCount; i++) {
          rp[i * 3 + 1] -= rainVel[i] * sp * (1 + Math.sin(elapsed + i) * 0.2)
          if (rp[i * 3 + 1] < -5) {
            rp[i * 3 + 1] = 8 + Math.random() * 3
            rp[i * 3] = (Math.random() - 0.5) * 24
          }
        }
        rain.geometry.attributes.position.needsUpdate = true

        // Expanding pulse rings
        pulseRings.forEach((pr) => {
          const t = (elapsed * 0.55 + pr.userData.phase) % 2.8
          const s = 1 + t * 1.8
          pr.scale.set(s, s, s)
          pr.material.opacity = Math.max(0, 0.35 - t * 0.12)
        })

        coreMat.emissiveIntensity = 0.35 + Math.sin(elapsed * 2.6) * 0.18
        key.intensity = 2.6 + Math.sin(elapsed * 1.6) * 0.5
        fill.intensity = 1.7 + Math.cos(elapsed * 1.1) * 0.3

        // Scroll-linked core lift + scale
        group.position.y = scroll.t * -0.8
        group.scale.setScalar(1 - scroll.t * 0.12)
        grid.position.y = -3.2 - scroll.t * 0.5
      }

      // Idle camera orbit + mouse parallax
      const idleX = prefersReduced ? 0 : Math.sin(elapsed * 0.18) * 0.35
      const idleY = prefersReduced ? 0 : Math.cos(elapsed * 0.14) * 0.18
      const targetX = mouse.x * 1.05 + idleX
      const targetY = mouse.y * 0.45 + 0.5 + idleY + scroll.t * 0.35
      camera.position.x += (targetX - camera.position.x) * 0.05
      camera.position.y += (targetY - camera.position.y) * 0.05
      camera.position.z = 9.2 - scroll.t * 1.2
      camera.lookAt(0, scroll.t * -0.3, 0)

      group.rotation.y = mouse.x * 0.22 + (prefersReduced ? 0 : elapsed * 0.05)
      group.rotation.x = mouse.y * 0.12

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      w = mount.clientWidth
      h = mount.clientHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    }
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  )
}
