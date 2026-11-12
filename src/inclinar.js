// Cards inclinam em 3D com o mouse
const CARTAO = '.perfil-card, .filme-card'
const INCLINACAO = 12

document.addEventListener('mousemove', (ev) => {
  const card = ev.target.closest(CARTAO)
  if (!card) return

  const r = card.getBoundingClientRect()
  const x = (ev.clientX - r.left) / r.width - 0.5
  const y = (ev.clientY - r.top) / r.height - 0.5

  card.style.transform =
    `perspective(800px) rotateX(${-y * INCLINACAO}deg) rotateY(${x * INCLINACAO}deg) scale(1.03)`
})

document.addEventListener('mouseout', (ev) => {
  const card = ev.target.closest(CARTAO)
  if (!card) return
  if (card.contains(ev.relatedTarget)) return
  card.style.transform = ''
})