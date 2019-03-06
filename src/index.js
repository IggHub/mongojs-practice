import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import path from 'path';

// First, it needs to:
// connect
// new Schema
// declare model
import mongoose from 'mongoose';

// connect 
const connectDB = () => mongoose.connect('mongodb://localhost:27017/mongoosedb');

// schema
const userSchema = new mongoose.Schema({
  username: String,
  age: Number
});


const UserData = mongoose.model('User', userSchema); // model(collectionName, schema)

const app = express();

// setting up hbs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// end hbs setup

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


connectDB().then( async () => {
  await UserData.deleteMany({}); 
  createUser();

  app.listen(process.env.PORT);
});

app.use((req, res, next) => {
  req.context = {
    models: {
      users: UserData
    }
  };

  next();
});

// renders indes.hbs
app.get('/', (req, res) => {
  res.render('index');
});

/* REST */
app.use('/users', routes.user);

//router.post('/users', async(req, res) => {
//  const newData = {
//    username: req.body.username,
//    age: req.body.age
//  };
//
//  console.log('newData: ', newData);
//  try {
//    const newUser = await req.context.model.users.create(newData);
//
//    res.send(newUser); 
//  } catch(e) {
//    return e;
//  }
//});

// create fake data
const createUser = async () => {
  const user1 = new UserData({
    username: 'iggy1',
    age: 10
  });

  const user2 = new UserData({
    username: 'iggy2',
    age: 20
  });

  const user3 = new UserData({
    username: 'iggy3',
    age: 30
  });

  await user1.save();
  await user2.save();
  await user3.save();
};


