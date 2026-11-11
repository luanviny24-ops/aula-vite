// Estrelas flutuando: só algumas seguem o mouse
const canvas = document.createElement('canvas')
canvas.style.cssText =
  'position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;'
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')

const QUANTIDADE = 140
const RAIO_CAPTURA = 90
const MAX_SEGUINDO = 12
const mouse = { x: -9999, y: -9999 }
let estrelas = []

function ajustarTamanho() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function criarEstrelas() {
  estrelas = []
  for (let i = 0; i < QUANTIDADE; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const angulo = Math.random() * Math.PI * 2
    const distancia = 10 + Math.random() * 25
    estrelas.push({
      x,
      y,
      baseX: x,
      baseY: y,
      vx: -(0.05 + Math.random() * 0.1),
      vy: -(0.04 + Math.random() * 0.08),
      offsetX: Math.cos(angulo) * distancia,
      offsetY: Math.sin(angulo) * distancia,
      velocidade: 0.05 + Math.random() * 0.08,
      seguindo: false,
      raio: 0.8 + Math.random() * 1.2,
      cor: Math.random() < 0.25 ? '#19ffe3' : '#ffffff',
    })
  }
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let seguindo = estrelas.filter((e) => e.seguindo).length

  for (const e of estrelas) {
    // a posição "de casa" flutua devagar na diagonal
    e.baseX += e.vx
    e.baseY += e.vy
    if (e.baseX < 0) {
      e.baseX = canvas.width
      if (!e.seguindo) e.x = e.baseX
    }
    if (e.baseY < 0) {
      e.baseY = canvas.height
      if (!e.seguindo) e.y = e.baseY
    }

    // o mouse chegou perto? então a estrela passa a seguir
    if (!e.seguindo && seguindo < MAX_SEGUINDO) {
      const dist = Math.hypot(mouse.x - e.x, mouse.y - e.y)
      if (dist < RAIO_CAPTURA) {
        e.seguindo = true
        seguindo++
      }
    }

    if (e.seguindo) {
      // gruda perto da seta do mouse
      e.x += (mouse.x + e.offsetX - e.x) * e.velocidade
      e.y += (mouse.y + e.offsetY - e.y) * e.velocidade
    } else {
      // volta para o lugar dela
      e.x += (e.baseX - e.x) * 0.05
      e.y += (e.baseY - e.y) * 0.05
    }

    ctx.beginPath()
    ctx.arc(e.x, e.y, e.raio, 0, Math.PI * 2)
    ctx.fillStyle = e.cor
    ctx.fill()
  }
  requestAnimationFrame(animar)
}

window.addEventListener('mousemove', (ev) => {
  mouse.x = ev.clientX
  mouse.y = ev.clientY
})
document.addEventListener('mouseleave', () => {
  mouse.x = -9999
  mouse.y = -9999
  for (const e of estrelas) e.seguindo = false
})
window.addEventListener('resize', () => {
  ajustarTamanho()
  criarEstrelas()
})

ajustarTamanho()
criarEstrelas()
animar()