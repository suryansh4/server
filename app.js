const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

app.use(express.json())

const User = require('./models/userSchema');

const uri = "mongodb+srv://admin-suryansh:suryanshpanwar@cluster0.snk5b.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log(`mongoose connected`))
.catch(err => console.error(err))


//middleware to check if the previous page that is required is visitd or
const middleware = (req , res , next) =>{
    console.log(`hello  middleware`);
    next();
}

app.get('/', async (req, res)=> {
    let user = []
    await User.find().then(data => user = data).catch(err => console.error(err))
    res.json(user)
});

app.get('/about ', middleware, (req, res)=>{
    res.send(`hellow about`);
    console.log(`jkdbf`);

});
app.get('/contact', (req, res)=>{
    res.send(`hellow contact`);
    console.log(`jkdbf`);

});

app.post('/signin', (req, res)=>{
    const {name, age} = req.body
    const new_user = new User({name, age})
    new_user.save().then(() => res.status(201).json(new_user)).catch(err => res.status(400).send(err))
});

app.get('/singup', (req, res)=>{
    res.send(`hellow signup`);
    console.log(`jkdbf`);

});

app.get('/user', (req, res) => {
    User.findOne({"name": req.query.name}).then((user) => res.status(202).json(user)).catch(err => res.status(404).json(err))
})

app.listen(3000, () => {
    console.log(`listning at 3000`);
})

