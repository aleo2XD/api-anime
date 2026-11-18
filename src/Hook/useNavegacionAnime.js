import { useNavigate } from 'react-router-dom'

export default function useNavegacionAnime() {
  const navigate = useNavigate()

  function irInicio() {
    navigate('/')
  }

  function irABuscar() {
    navigate('/buscar')
  }

  return { irInicio, irABuscar }
}
