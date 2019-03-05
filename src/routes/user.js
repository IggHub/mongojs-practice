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

export default router;
