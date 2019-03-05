import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
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


const UserData = mongoose.model('User', userSchema);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


connectDB().then( async () => {
  await UserData.deleteMany({}); 
  createUser();

  app.listen(process.env.PORT);
});

app.get('/', (req, res) => {
  res.send('hello root!');
});


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


