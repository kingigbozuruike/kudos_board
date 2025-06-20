const express = require('express')
const { json, urlencoded } = express
const cors = require('cors')
const dotenv = require('dotenv')
// const boardRoutes = require("./boardRoutes/boardRoutes.js")
// const cardRoutes = require("./cardRoutes/cardRoutes.js")
// const filterRoutes = require("./filterRoutes/filterRoutes.js")


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(json())
app.use(urlencoded({extended: true}))
app.use(cors())

app.get("/api/", (req, res) => {
    res.json({
        message: "Your API is working!"
    })
})

// app.use(boardRoutes)
// app.use(cardRoutes)
// app.use(filterRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
