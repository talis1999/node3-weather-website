const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req,res) => {
    res.render('index', {
        title:'Weather',
        name:'Daniel Talisman'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name:'Daniel Talisman'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help',
        msg:'For help please call 057-888-1246',
        name:'Daniel Talisman'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error:"please provide an input"})
    }
    geocode(req.query.address,(error,{latitude, longtitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecastData,
                location,
                address:req.query.address
            })
          })
    })

})

app.get('/products' ,(req,res) =>{
    if(!req.query.search){
        return res.send({error:'You must provide a search term'})
    }
    
    console.log(req.query.search)
    res.send({products:[]})
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        error:'Article not found',
        name:'Daniel Talisman'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        error:'Page not found',
        name:'Daniel Talisman'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})