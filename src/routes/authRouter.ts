import { Request, Response, Router } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../models';

const genSalt = bcrypt.genSaltSync(10);
const secret = process.env.SESSION || 'secret';

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    try {
        let { email, password, username } = req.body;
        const query = email? { email: email } : { username: username };

        const user = await User.findOne(query);

        if (user) {
            const userPass = user.password || '';
            const isMatch = await bcrypt.compare(password, userPass);
            if (isMatch) {
                const userDoc = {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                }
                const token = jwt.sign(userDoc.id, secret, {}, (err, token) => {
                    if (err) {
                        throw new Error(err.message);
                    } else {
                        res.cookie('token', token, { httpOnly: true });
                    }
                
                });
                res.json({ message: 'Login successful', token: token });
            } else {
                res.json({ error: 'Invalid Password' });
            }
        } else {
            res.json({error: 'User not found'})
        }
    } catch (error: any) {
        res.json({ error: error.message });
    }
})

authRouter.post('/register', async (req: Request, res: Response) => {
    try {
        let { email, password, username, name } = req.body;

        const userExists = await checkUser(username, email);
        if (userExists) {
            res.json({ error: 'User already exists' });
        } else {
            const hashedPass = bcrypt.hashSync(password, genSalt);
            const user = new User({ 
                email: email, 
                password: hashedPass, 
                username: username,
                name: name,
            });
            await user.save();
            res.json({ message: 'User created' });
        }
    } catch (error: any) {
        res.json({ error: error.message });
    }
})

authRouter.get('/logout', (req: Request, res: Response) => {
    req.session?.destroy((error) => {
        if (error) {
            res.json({ error: error.message });
        } else {
            res.json({ message: 'Logged out' });
        }
    });
})


const checkUser = (username: string, email: string): Promise<Boolean> => {
    const exist = User.findOne({ $or: [{ username: username }, { email: email }] })
                        .then((user) => {
                            if (user) {
                                return true;
                            } else {
                                return false;
                            }
                        })
                        .catch((error) => {
                                return true;
                            }) 

    return exist
}

export default authRouter;
