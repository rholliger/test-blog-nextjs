import { getBlogBySlug } from "lib/api"


export default async function enablePreview(req, res) {
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const blog = await getBlogBySlug(req.query.slug)

  if (!blog) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // NextJS will set cookies to tell the browser that you are in preview mode
  // __prerender_bypass __next_preview_data
  res.setPreviewData({})
  // Redirects to the blog page
  res.writeHead(307, { Location: `/blogs/${blog.slug}` })
  res.end()
}