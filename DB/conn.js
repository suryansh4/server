 const mongoose = require('mongoose');
 
 
 
 const uri = process.env.DATABASE;
 mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log(`mongoose connected`))
.catch(err => console.error(err))