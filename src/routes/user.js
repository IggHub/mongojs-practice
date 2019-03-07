import {Router} from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await req.context.models.users.find();

    res.send(users);
  } catch(e) {
    console.log('Error: ', e);
    res.status(500).send("An error occurred!");
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await req.context.models.users.findById(userId)
    res.send(user);
  } catch(e) {
    res.status(500).send("An error occurred!");
  }
});

// curl -X POST -H "Content-Type:application/json" http://localhost:3000/users/ -d '{"username": "iggypost", "age": 30}'
router.post('/', async (req, res) => {
  try{
    const user = await req.context.models.users.create({
      username: req.body.username,
      age: req.body.age
    });

    res.send(user);
  } catch(e){
    console.log('Error: ', e);
    res.status(500).send("An error occurred!")
  }
});

/* 
 * curl -X PUT http://localhost:3000/users/user-id-here -d age=100 -d username=iggyupdate 
 * curl -X -H "Content-Type:application/json" http://localhost:3000/users/user-id-here -d '{"username":"iggyupdate", "age":"100"}'
 */

/* curl -X POST -H "Content-Type:application/json" http://localhost:3000/users/update -d '{"id": "some-id-here", "age": 31, "username": "someusername"}'*/
router.post('/update', async (req, res) => {
  const userId = req.body.id;
  console.log('username body:', req.body);
  let user = null;
  try{
    user = await req.context.models.users.findById(userId);
    user.username = req.body.username;
    user.age = req.body.age;
    user.save();
    res.redirect('/');
  } catch(e) {
    console.log("Error: ", e);
    res.status(500).send("An error occurred!");
  }
});

/* curl -X DELETE http://localhost:3020/users/some-user-id */
router.post('/delete', async (req, res) => {
  const userId = req.body.id;
  console.log('user body:', req.body);
  let user = null;
  try {
    user = await req.context.models.users.findByIdAndRemove(userId);
    console.log('user: ', user);
    res.redirect('/');
  } catch(e) {
    console.log("Error: ", e);
    res.status(500).send("An error occurred: ", e);
  }
});
export default router;
