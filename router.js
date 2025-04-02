//1. import express and get router object
const express = require('express')
const router = express.Router()


// 3. create a fetch
const fetch = (...arrs)=> import('node-fetch').then(({ default: fetch})=> fetch(...args))


//4. create port
const port = process.env.port || 3000

//5. use public folder gives access to public directory
router.use(express.static('public'))

//6. create our pages
//home page
router.get('/home', (req, res)=> {
    // .render(path => where we are rendering, obj => what we are rendering)
    res.render('page/home', {
        title: 'my hero home page',
        name:'cj hero db pager'
    })
})


router.get('/heroes', (req, res)=> {

})

// error page
router.get('*', (req, res)=> {
    if (req.url == '/favicon.ico/'){
        res.end()
    } else {
        res.send('<h1>404 error,</h1>')
    }
})


// 2. export router
module.exports = router
