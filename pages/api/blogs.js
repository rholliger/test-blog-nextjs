import { getAllBlogs, getBlogsForPage } from 'lib/api'

export default async function getBlogs(req, res) {
  if (req.query.per_page && req.query.page) {
    const data = await getBlogsForPage({ amount: parseInt(req.query.per_page), page: parseInt(req.query.page) })
    res.status(200).json(data)
    return
  }

  const data = await getAllBlogs()
  res.status(200).json(data)
}