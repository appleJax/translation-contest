import routeAdminPanel from './admin'
import routeAuth       from './auth'
import routeApi        from './api'
import routeUI         from './ui'
// import addWebhook from './twitter';  // for twitter account_activity api (not currently used)

const { NODE_ENV, NO_HTTPS, ORIGIN_URL } = process.env

const dev = NODE_ENV === 'dev'

export default (app) => {
  // Enable reverse proxy support in Express. This causes the
  // the "X-Forwarded-Proto" header field to be trusted so its
  // value can be used to determine the protocol.
  app.enable('trust proxy')

  // CORS
  app.use((req, res, next) => {
    if (dev || NO_HTTPS || req.secure) {
      const protocol = dev ? 'http' : 'https'
      res.header('Access-Control-Allow-Origin', `${protocol}://${ORIGIN_URL}`)
      res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
      res.header('Access-Control-Allow-Credentials', true)
      res.header('Access-Control-Max-Age', '86400') // 24 hours
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      )
      next()
    } else {
      res.redirect('https://' + req.headers.host + req.url)
    }
  })

  // addWebhook(app); // for twitter account_activity api (not currently used)
  routeAuth(app)
  routeAdminPanel(app)
  routeApi(app)
  routeUI(app)
}
