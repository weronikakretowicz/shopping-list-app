import {app} from '../app';
import {User} from '../models/User';
import bcrypt from 'bcrypt';
import {validateRequest} from '../validators/validateRequest';
import {registerSchema, loginSchema} from '../validators/userValidators';
import {JWT_SECRET} from '../config';
import jwt from 'jsonwebtoken';

app.post('/users/register', validateRequest(registerSchema), async (c) => {
    const {username, email, password} = await c.req.json();
    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return c.json({error: 'Email already in use'}, 409);
    }

    const user = new User({username, email, passwordHash});
    await user.save();

    return c.json({message: 'User registered successfully', user});
});


app.post('/users/login', validateRequest(loginSchema), async (c) => {
    const {email, password} = await c.req.json();
    const user = await User.findOne({email});

    if (!user) {
        return c.json({error: 'User doesn\'t exist'}, 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
        return c.json({error: 'Invalid credentials'}, 401);
    }

    const token = jwt.sign(
        {userId: user._id.toString()},
        JWT_SECRET,
        {expiresIn: '1h'}
    );

    return c.json({
        message: 'Login successful',
        token,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    });
});
