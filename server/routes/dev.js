const Router = require('koa-router')

const handleSSR = require('../ssr/dev-ssr')

const router = new Router()
router.get('*', handleSSR)

module.exports = router