import ThemeProvider from 'providers/ThemeProvider'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faList, faBorderAll } from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'highlight.js/styles/darcula.css'
import 'styles/index.scss'

config.autoAddCss = false
library.add(faList, faBorderAll)

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
