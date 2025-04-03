
//1.
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000



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

con.connect(error => !error ? console.log('The connection is up, up, and away'): console.log("You ain't connected, yo...", error))


//5.
server.get('/', (req, res)=> {
    res.json({
        'All Heroes': `http://localhost:${PORT}/api/hero`,
        'All Franchises': `http://localhost:${PORT}/api/franchise`,
        'All Species': `http://localhost:${PORT}/api/species`,
        'All Powers': `http://localhost:${PORT}/api/power`,
        'All Teams': `http://localhost:${PORT}/api/team`
    })
})


//6.

server.get('/api/hero', (req, res)=> {
    con.query(
        `select h.hero_id, h.first_name, h.last_name, h.alias, f.franchise, s.species, h.first_app
        from hero h
        join franchise f using (franchise_id)
        join species s using (species_id)
        order by h.hero_id;`,
        (error, rows)=> {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('ERROR!!: ', error)
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
                console.log('ERROR!!: ', error)
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
                console.log('ERROR!!: ', error)
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
                console.log('ERROR!!: ', error)
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
                console.log('ERROR!!: ', error)
            }
        }
    )
})


//8.
server.get('/api/hero/:id', (req, res)=> {
    const id = req.params.id
    con.query(
        `select h.hero_id, h.hero_name, h.first_name, h.last_name, h.alias, f.franchise, s.species, h.first_app
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
                console.log('ERROR!!: ', error)
            }
        }
    )
})

//got to router
server.set('view engine', 'ejs')
server.use('/', router)

//2
server.listen(PORT, ()=> console.log(`Not the PORT ${PORT} porting...`))

