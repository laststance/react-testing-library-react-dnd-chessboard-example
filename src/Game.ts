export function observe(receive: Function) {
  const randPos = () => Math.floor(Math.random() * 8)
  setInterval(() => receive([randPos(), randPos()]), 500)
}
