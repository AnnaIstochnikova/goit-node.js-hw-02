import { User } from '#models/schemas/user.js';
import { validateUser } from '#models/validateUser.js';

export async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    const { value, error } = await validateUser(email, password);
    if (error) {
      return res.status(404).json({ message: error });
    }

    const sameEmail = await User.findOne({ email }).lean();
    if (sameEmail) {
      res.status(409).json({ message: 'Email in use' });
    }

    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();
    return res
      .status(201)
      .json({ user: { email: newUser.email, subscription: newUser.subscription } });
  } catch (error) {
    next(error);
  }
}
