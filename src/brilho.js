const brilho = document.createElement('div')
brilho.className = 'brilho-mouse'
document.body.appendChild(brilho)

window.addEventListener('mousemove', (ev) => {
  brilho.style.opacity = '1'
  brilho.style.transform = `translate(${ev.clientX}px, ${ev.clientY}px)`
})

document.addEventListener('mouseleave', () => {
  brilho.style.opacity = '0'
})