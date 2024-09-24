import { Hono } from 'hono'
import hashing from '../../functions/hashing'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from 'hono/jwt'

const app = new Hono<{
    Bindings: {  // used for defining types. Note the location us wrangler.toml
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()

app.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    })

    const { email, password } = await c.req.json()

    const hashValue = await hashing(password)

    const userData = await prisma.user.findUnique({ where: { email: email } })

    if (!userData) {
        c.status(400)
        return c.json({ msg: 'Could not find the user using the email.' })
    }

    if (hashValue == userData.password) {

        const token = await sign({ id : userData.id ,email }, c.env.JWT_SECRET)

        c.status(200)
        return c.json({ msg: 'Welcome!', token })
    }

    c.status(400)
    return c.json({ msg: 'Could not find the user using the email.' })
})

export default app