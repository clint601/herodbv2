//1. import express and get router object
const express = require('express')
const router = express.Router()


// 3. create a fetch
const fetch = (...args)=> import('node-fetch').then(({ default: fetch})=> fetch(...args))


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


router.get('/hero', (req, res)=> {
    const url = `http://localhost:${port}/api/hero`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/hero', {
                title: 'all heroes',
                name: 'all heroes',
                data
            })
        })
})


// single pages

router.get('/hero/:id', (req, res)=> {
    const id = req.params.id

    const url = `http://localhost:${port}/api/hero/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('pages/heroSingle', {
            title: data.hero_name,
            name: data.hero_name,
            data
        })
    })
})

// error page
// router.get('*', (req, res)=> {
//     if (req.url == '/favicon.ico/'){
//         res.end()
//     } else {
//         res.send('<h1>404 error,</h1>')
//     }
// })


// 2. export router
module.exports = router
