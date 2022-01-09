import client, { previewClient } from './sanity'
import imageUrlBuilder from '@sanity/image-url'

const blogFields = `
  title,
  subtitle,
  'slug': slug.current,
  date,
  'author': author->{name, 'avatar': avatar.asset->url},
  coverImage,
`

const builder = imageUrlBuilder(client)
const getClient = (preview) => preview ? previewClient : client

export function urlFor(source) {
  return builder.image(source)
}

export async function getAllBlogs({ offset } = { offset: 0 }) {
  const results = await client
    .fetch(`*[_type == "blog"] | order(_createdAt desc) {${blogFields}}`)

  return results
}

export async function getBlogsForPage({ amount, page } = { amount: 3, page: 0 }) {
  const currentOffset = page * amount

  const results = await client
    .fetch(`*[_type == "blog"] | order(_createdAt desc) {${blogFields}}[${currentOffset}...${currentOffset + amount}]`)

  return results
}

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview)

  const result = await currentClient
    .fetch(`*[_type == "blog" && slug.current == $slug] {
      ${blogFields}
      content[]{..., "asset": asset->}
    }`, {slug})
    .then(res => preview ? (res?.[1] ? res[1] : res?.[0]) : res?.[0])

  return result
}