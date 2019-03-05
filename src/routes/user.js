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
router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log('username body:', req.body);
  let result = null;
  try{
    result = await req.context.models.users.findOneAndUpdate(userId, {
      username: req.body.username,
      age: req.body.age
    })
    res.send(result);
  } catch(e) {
    console.log("Error: ", e);
    res.status(500).send("An error occurred!");
  }
});

/* curl -X DELETE http://localhost:3020/users/some-user-id */
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;
  let result = null;
  try {
    const user = await req.context.models.users.findById(userId);
    result = await user.remove(); 
    res.send(result);
  } catch(e) {
    console.log("Error: ", e);
    res.status(500).send("An error occurred!");
  }
});
export default router;
