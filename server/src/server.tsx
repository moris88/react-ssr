import express from 'express'
import * as ReactDOMServer from 'react-dom/server'
import React from 'react'
import App from '../../client/src/App'
import dotenv from 'dotenv'

const { log, error } = console

const environment = dotenv.config().parsed
const env = environment ? environment : { PORT: 3000, TITLE: 'SS REACT'}
const app = express()
const port = env.PORT ?? 3000
const title = env.TITLE ?? 'SSR React'

try {
    app.get('/', (req, res) => {
        const server = ReactDOMServer.renderToString(<App />)
        const html = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <script src="app.js" async defer></script>
    </head>
    <body>
        <div id="root">${server}</div>
    </body>
</html>
        `
        res.send(html)
    })

    app.use(express.static('./build'))

    app.listen(port, () => {
        log(`Server listening on port: ${port}`)
    })
} catch(err) {
    error(err)
}