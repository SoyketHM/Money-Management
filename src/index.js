const express       = require('express');
const app           = express();
const morgan        = require('morgan');
const mongoose      = require('mongoose');
const cors          = require('cors');
const userRoutes    = require('./routers/userRoutes');
const errorHandler  = require('./middlewares/errors');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(userRoutes);
app.use(errorHandler);

app.use('/api/users', userRoutes);

// connect to mongoose
let dburl = 'mongodb://root:root123@ds213472.mlab.com:13472/bookstore';
mongoose.connect('mongodb://root:root123@ds213472.mlab.com:13472/bookstore', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true }, error => {
	if (error) {
		console.log(`FAILED to connect using mongoose. ${error}`);
	} else {
		console.log(`Connected to DB server.`);
	}
});

app.get('/', (req,res)=>{
    res.json({message: 'Wellcome to my app'});
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{ console.log(`Server listen on port ${PORT}`) });