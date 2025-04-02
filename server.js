
//1.
const express = require('express')
const server = express()
const port = process.env.port || 3000

// import router
const router = require('./router')


//3.
const mysql = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'herodb'
})

//4.
con.connect(error => !error ? console.log('it work good job') : console.log('does not work you suck...',error))

//5.
server.get('/', (req, res)=> {
    res.json({
        'all hero':`http://localhost:${port}/api/hero`,
        'all franchises':`http://localhost:${port}/api/franchise`,
        'all species':`http://localhost:${port}/api/species`,
        'all powers':`http://localhost:${port}/api/power`,
        'all teams':`http://localhost:${port}/api/team`,
    })
})


//6.
server.get('/api/hero', (req, res)=> {
    con.query(
        `select h.hero_id, h.first_name, h.last_name, h.alias, f.franchise, s.species, h.first_app 
        from hero h
        join franchise f using (franchise_id)
        join species s using (species_id)`,
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else { 
                    res.json(rows)
                }
            } else {
                console.log('error!!:', error)
            }
        }
    )
})



//7.
server.get('/api/franchise', (req, res)=> {
    con.query(
        'select * from franchise;',
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else { 
                    res.json(rows)
                }
            } else {
                console.log('error!!:', error)
            }
        }
    )
})


server.get('/api/species', (req, res)=> {
    con.query(
        'select * from species;',
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else { 
                    res.json(rows)
                }
            } else {
                console.log('error!!:', error)
            }
        }
    )
})


server.get('/api/power', (req, res)=> {
    con.query(
        'select * from power;',
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else { 
                    res.json(rows)
                }
            } else {
                console.log('error!!:', error)
            }
        }
    )
})


server.get('/api/team', (req, res)=> {
    con.query(
        'select * from team;',
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else { 
                    res.json(rows)
                }
            } else {
                console.log('error!!:', error)
            }
        }
    )
})


//8.
server.get('/api/hero/:id', (req, res)=> {
    const id = req.params.id
    con.query(
        `select h.hero_id, h.first_name, h.last_name, h.alias, f.franchise, s.species, h.first_app 
        from hero h
        join franchise f using (franchise_id)
        join species s using (species_id)
        where h.hero_id = ${id};`,
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else { 
                    res.json(rows)
                }
            } else {
                console.log('error!!: ', error)
            }
        }
    )
})


// got to router.js
server.set('view engine', 'ejs')
server.use('/router')


//2.
server.listen(port, ()=> console.log(`not the port ${port} porting...`))