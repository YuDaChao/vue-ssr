const Router = require('koa-router')

const handleSSR = require('../ssr/ssr')

const router = new Router()
router.get('*', handleSSR)

module.exports = router