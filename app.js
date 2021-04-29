const express = require('express');
const reqLogger = require('./Utilities/requestLogger');
const route = require('./Route/routing');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const errorLogger = require('./Utilities/error-logger');
const clientErrorHandler = require('./Utilities/client-error-handler');
const errorHandler = require('./Utilities/error-handler');
const mongoose = require('mongoose');
const mongoURL = ''
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then( () =>{console.log('DB connection successful')}).catch((err)=>{
  console.error(err.stack)
});


const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(session(
  {
    name:SESS_NAME,
    secret:SESS_SECRET,
    store: MongoStore.create(
      {
        mongoUrl:mongoURL,
        collection:'sessions',
        ttl:parseInt(SESS_LIFETIME/1000),
      }),
    resave:false,
    cookie:{
      sameSite:true,
      secure:process.env.NODE_ENV === 'production',
      maxAge:parseInt(SESS_LIFETIME),
    },
  }
));
app.use(reqLogger);
app.use('/',route);
app.use(errorLogger);
app.use(clientErrorHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`Server started... Listening on port ${port}`)
})
