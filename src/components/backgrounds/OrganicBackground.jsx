import { useEffect, useRef } from 'react';

export const OrganicBackground = ({ className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove any existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Vertex Shader
    const vertexShader = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader – Organic Flow / Neural Network Effect
    const fragmentShader = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = v_texCoord;
        float time = u_time * 0.12;

        // =============================================
        // ORGANIC FLOW – Neural Network Style
        // =============================================
        vec2 movement = vec2(
          sin(time * 0.7 + uv.y * 3.0 + uv.x * 1.5) * 0.15,
          cos(time * 0.6 + uv.x * 3.0 + uv.y * 1.5) * 0.15
        );
        uv += movement;

        // Layer 1: Large organic waves
        float wave1 = sin(uv.x * 2.5 + time * 0.8) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 2.8 - time * 0.7) * 0.5 + 0.5;
        float wave3 = sin((uv.x + uv.y) * 2.0 + time * 1.2) * 0.5 + 0.5;

        // Layer 2: Fine detail / neural network-like connections
        float detail = sin(uv.x * 12.0 + uv.y * 10.0 + time * 1.5) * 0.5 + 0.5;
        detail = smoothstep(0.4, 0.6, detail);

        // Layer 3: Mouse interaction (subtle)
        float mouseDist = distance(uv, u_mouse / u_resolution);
        float mouseEffect = 1.0 - smoothstep(0.0, 0.5, mouseDist);

        // =============================================
        // COLORS – Dark Mode (Deep Space)
        // =============================================
        vec3 color1 = vec3(0.02, 0.04, 0.10); // Deepest dark
        vec3 color2 = vec3(0.06, 0.10, 0.20); // Mid dark
        vec3 color3 = vec3(0.12, 0.08, 0.22); // Purple hint

        // Accent Colors – AI Glow
        vec3 accent1 = vec3(0.39, 0.40, 0.95); // Indigo
        vec3 accent2 = vec3(0.55, 0.35, 0.92); // Violet
        vec3 accent3 = vec3(0.10, 0.60, 0.90); // Blue

        // Blend base layers
        float blend1 = wave1 * 0.4 + wave2 * 0.3;
        float blend2 = wave3 * 0.3 + detail * 0.15;

        vec3 finalColor = mix(color1, color2, blend1);
        finalColor = mix(finalColor, color3, blend2);

        // Add glow accents
        float glow1 = sin(wave1 * 8.0 + time * 0.5) * 0.5 + 0.5;
        float glow2 = sin(wave2 * 6.0 - time * 0.4) * 0.5 + 0.5;
        float glow3 = detail * 0.3 + mouseEffect * 0.15;

        vec3 glowColor = mix(accent1, accent2, glow1);
        glowColor = mix(glowColor, accent3, glow2 * 0.3);

        // Pulse
        float pulse = 0.85 + 0.15 * sin(time * 0.3);

        // Combine
        finalColor += glowColor * (0.12 + 0.08 * glow2 + 0.05 * glow3) * pulse;

        // Vignette
        float dist = distance(uv, vec2(0.5, 0.5));
        float vignette = 1.0 - dist * 0.5;
        finalColor *= vignette;

        // Subtle grain
        float grain = (fract(sin(dot(uv * 100.0, vec2(12.9898, 78.233))) * 43758.5453)) * 0.015;
        finalColor += grain;

        gl_FragColor = vec4(finalColor, 0.85);
      }
    `;

    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, vertexShader);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouseY = (canvas.height - (e.clientY - rect.top) * (canvas.height / rect.height));
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    window.addEventListener('resize', handleResize);

    let animationId;

    function render(time) {
      const w = canvas.width;
      const h = canvas.height;
      gl.viewport(0, 0, w, h);
      gl.uniform1f(uTime, time * 0.001);
      gl.uniform2f(uRes, w, h);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    }

    render(0);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationId) cancelAnimationFrame(animationId);
      container.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`} />;
};