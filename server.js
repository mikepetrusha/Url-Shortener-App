const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/ShortUrl')
const app = express()

app.set('view engine', 'ejs')
mongoose.connect('mongodb+srv://mikhailpetrusha:sQ4HnCunKWHiOF6D@cluster0.yuuyxpj.mongodb.net/UrlShortener', {
    useNewUrlParser: true
})
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(3000) 