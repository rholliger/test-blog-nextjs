import sanityClient from '@sanity/client'

const options = {
  dataset: process.env.SANITY_DATASET_NAME,
  projectId: process.env.SANITY_PROJECT_ID,
  // useCdn === true, gives you fast response, it will get you cached data
  useCdn: process.env.NODE_ENV === 'production'
}

export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

export default sanityClient(options)