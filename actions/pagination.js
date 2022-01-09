// import { useSwrpage }
import useSWRInfinite from 'swr/infinite'

const PAGE_SIZE = 3

const fetcher = (url) => fetch(url).then(res => res.json())

export const useGetBlogsPages = (initialData) => {
  return useSWRInfinite(
    (index) =>
      `/api/blogs?per_page=${PAGE_SIZE}&page=${index}`, fetcher, { fallbackData: initialData }
  )
}