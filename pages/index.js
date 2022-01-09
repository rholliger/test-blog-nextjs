import { useState } from 'react'
import { Container, Row, Col, Media, Image, Card } from 'react-bootstrap'

import PageLayout from 'components/PageLayout'
import AuthorIntro from 'components/AuthorIntro'
import CardListItem from 'components/CardListItem'
import CardItem from 'components/CardItem'
import FilteringMenu from 'components/FilteringMenu'
import CardItemBlank from 'components/CardItemBlank'
import PreviewAlert from 'components/PreviewAlert'

import { getAllBlogs, getBlogsForPage } from 'lib/api'
import { useGetBlogs, useGetHello } from 'actions'
import { useGetBlogsPages } from 'actions/pagination'

export default function Home({ blogs: initialData, preview }) { 
  const [filter, setFilter] = useState({
    view: {
      list: 0
    }
  })

  // const { data: blogs, error } = useGetBlogs(initialData)

  const { data, error, size, setSize } = useGetBlogsPages(initialData)

  const blogs = data ? [].concat(...data) : []

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')

  return (
    <PageLayout>
      <button onClick={() => setSize(size + 1)}>Click me</button>
      { preview && <PreviewAlert /> }
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({...filter, [option]: value})
        }}
      />
      <hr/>
      <Row className="mb-5">
        {/* <Col md="10">
          <CardListItem />
        </Col> */}
        {
          blogs.map(blog => 
            filter.view.list ?
              <Col key={`${blog.slug}-list`} md="9">
                <CardListItem 
                  author={blog.author}
                  title={blog.title}
                  subtitle={blog.subtitle}
                  date={blog.date}
                  link={{
                    href: '/blogs/[slug]',
                    as: `/blogs/${blog.slug}`
                  }}
                />
              </Col>
              :
              <Col key={blog.slug} md="4">
                <CardItem 
                  author={blog.author}
                  title={blog.title}
                  subtitle={blog.subtitle}
                  date={blog.date}
                  image={blog.coverImage}
                  link={{
                    href: '/blogs/[slug]',
                    as: `/blogs/${blog.slug}`
                  }}
                />
              </Col>
          )
        }
        { isLoadingMore && <CardItemBlank /> }
        
      </Row>
    </PageLayout>
  )
}

// This function is called during the build (build time)
// is only called on the server
// Provides props to your page
// It will create a static page
export async function getStaticProps({ preview = false }) {
  const blogs = await getBlogsForPage()

  return {
    props: {
      blogs,
      preview
    }
  }
}