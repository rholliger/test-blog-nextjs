import { Row, Col } from 'react-bootstrap'
import BlockContent from '@sanity/block-content-to-react'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'

import { getAllBlogs, getBlogBySlug, getBlogsForPage } from 'lib/api'
import PageLayout from 'components/PageLayout'
import BlogHeader from 'components/BlogHeader'
import BlogContent from 'components/BlogContent'
import PreviewAlert from 'components/PreviewAlert'

const BlogDetail = ({ blog, preview }) => {
  const router = useRouter()

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />
  }

  if (router.isFallback) {
    return (
      <PageLayout className="blog-detail-page">
        Loading...
      </PageLayout>
    )
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          { preview && <PreviewAlert /> }
          <BlogHeader {...blog} />
          <hr/>
          <BlogContent content={blog.content} />
        </Col>
      </Row>
    </PageLayout>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = await getBlogBySlug(params.slug, preview)

  return {
    props: { blog, preview },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  // As we don't have many blogs, we can just statically generate all the blogs
  // uncomment this for better build time
  // const blogs = await getBlogsForPage()
  const blogs = await getAllBlogs()
  const paths = blogs?.map(b => ({ params: { slug: b.slug } }))
  return {
    paths,
    fallback: true
  }
}

export default BlogDetail