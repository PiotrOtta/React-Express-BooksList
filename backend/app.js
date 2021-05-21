const express   = require('express')
const mysql     = require('mysql')
const cors      = require('cors')

const app       = express()
const port      = process.env.PORT || 5000;

app.use( express.urlencoded({ extended: false }) )
app.use( express.json() )
app.use( cors() )
/*  ┌───────────────────────────────────────┐
    │ Definiowanie połączenia z bazą danych │
    └───────────────────────────────────────┘ */
const pool = mysql.createPool( {
    connectionLimit:    10,
    host:               'localhost',
    user:               'root',
    password:           '',
    database:           'react_database'
} )

const books_data = []

/*  ┌─────────────────────────────────┐
    │ Pobieranie rekordów z bazy bazy │
    └─────────────────────────────────┘ */
app.get( '/get-books', ( req, res ) => {
    pool.getConnection( ( err, connection ) => {
        if ( err ) throw err
        connection.query( 'SELECT * FROM books', ( err, rows ) => {
            connection.release()
            if( !err )  { res.send( rows ) }
        } )
    } )
} )
/*  ┌────────────────────────────┐
    │ Wstawianie rekordu do bazy │
    └────────────────────────────┘ */
app.post( '/get-books', ( req, res ) => {
    pool.getConnection( ( err, connection ) => {
        if ( err ) throw err
        const parameters = req.body
        const insertBooks  = [ {
            title: parameters.title,
            author: parameters.author,
            image: parameters.image
        } ]
        connection.query( "INSERT INTO books SET ?", insertBooks, ( err, rows ) => {
            connection.release()
        } )
        res.send('Dodano')
    } )
} )

/*  ┌──────────────────────────┐
    │ Usuwanie rekordu do bazy │
    └──────────────────────────┘ */
    app.delete( '/get-books', ( req, res ) => {
            pool.getConnection( ( err, connection ) => {
                if ( err ) throw err
                const parameters = req.body
                parameters.forEach(element => {
                    connection.query( "DELETE FROM books WHERE id = ?", element.id )
                });
                connection.release()
                res.send('Usunięto')
            } )
    } )

app.listen(port, ()=> {  })