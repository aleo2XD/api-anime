const ANILIST_API_URL = 'https://graphql.anilist.co'

const PERSONAJE_QUERY = `
  query ($search: String!) {
    Character(search: $search) {
      id
      name {
        full
        native
      }
      image {
        large
      }
      description(asHtml: false)
      siteUrl
      media(perPage: 10, sort: POPULARITY_DESC) {
        edges {
          node {
            id
            type
            title {
              romaji
              english
              native
            }
          }
        }
      }
    }
  }
`

export async function buscarPersonaje(nombre, { signal } = {}) {
  const respuesta = await fetch(ANILIST_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: PERSONAJE_QUERY,
      variables: { search: nombre },
    }),
    signal,
  })
  const resultado = await respuesta.json()

  if (!respuesta.ok || resultado.errors?.length) {
    const mensaje = resultado.errors?.map(({ message }) => message).join('; ')
    throw new Error(mensaje || `AniList respondió con el estado ${respuesta.status}`)
  }

  const personaje = resultado.data?.Character
  if (!personaje) return null

  const animes = (personaje.media?.edges ?? [])
    .map(({ node }) => node)
    .filter((node) => node?.type === 'ANIME')
    .map(({ id, title }) => ({
      id,
      title: title.english || title.romaji || title.native,
    }))
    .filter((anime) => anime.title)

  return {
    id: personaje.id,
    name: personaje.name.full,
    name_kanji: personaje.name.native,
    imageUrl: personaje.image.large,
    about: personaje.description,
    url: personaje.siteUrl,
    animes,
  }
}
