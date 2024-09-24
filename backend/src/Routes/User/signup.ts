import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from 'hono/jwt'
import hashing from '../../functions/hashing';
import checkUserSignup from '../../Zod/userSignup';

const app = new Hono<{
    Bindings: {  // used for defining types. Note the location us wrangler.toml
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

app.post('/', async (c) => {
    const JWTSECRET: string = c.env.JWT_SECRET

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    })

    const { email, name, password } = await c.req.json()

    if (!checkUserSignup({ email, name, password })) {
        c.status(404)
        return c.json({ msg: "Please enter valid inputs" })
    }

    const hash_value: String = await hashing(password) // return hash value

    try {

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hash_value.toString()
            }
        })

        const token = await sign({ id: user.id, email }, c.env.JWT_SECRET)
        c.status(200)

        return c.json({ user, token, msg: "User and Posts Added" })
    } catch (error) {
        c.status(404)
        return c.json({ msg: "Failed to generate token", error })
    }
})

export default app