const path=require('path')
const request= require ('request')
const express=require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app=express()

const fileDirectory=path.join(__dirname, '../public')
const viewsDirectory=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsPath)


app.use(express.static(fileDirectory))


app.get('/weather', (req, res)=>{
    if (!req.query.address) {
       return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location }) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
})

app.get('', (req, res)=>{ 
  res.render('index', {
      title:'Weather App',
      name: 'Goodness Ojeaga'
  })
})


app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About',
        name: 'Goodness Ojeaga'
    })
})

app.get('/products',  (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error:' This search is incorrect'
        })
        
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
    })


app.get('/help',(req, res)=>{
    res.render('help', {
        title:'Help',
        name: 'Goodness Ojeaga'
    })
})


app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404',
        name: 'Goodness Ojeaga',
        errorMessage: 'Help article not Found!'
    })
})


app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name:'Goodness Ojeaga',
        errorMessage: 'Page not Found'

    })
})


app.listen(3000, ()=>{
    console.log('Listening to server from port 30000')
})
