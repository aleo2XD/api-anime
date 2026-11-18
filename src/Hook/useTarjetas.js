import { useState } from 'react'

export default function UseTarjetas() {
  const [tarjetas, setTarjetas] = useState([])

  const agregar = (nueva) => setTarjetas((actuales) => [...actuales, nueva])

  return { tarjetas, agregar }
}