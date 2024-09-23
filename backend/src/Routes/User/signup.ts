import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
// import jwt from 'jsonwebtoken'
// import hashing from '../../functions/hashing';
import checkUserSignup from '../../Zod/userSignup';

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

app.post('/', async (c) => {
    const JWT_SECRET: string = c.env.JWT_SECRET

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    })

    const { email, name, password } = await c.req.json()

    if (!checkUserSignup({ email, name, password })) {
        c.status(404)
        return c.json({ msg: "Please enter valid inputs" })
    }

    // const hash_value: String = await hashing(password) // return hash value

    // const token = jwt.sign({ email, name, password }, JWT_SECRET)

    c.status(200)
    return c.json( "token" )
})

export default app