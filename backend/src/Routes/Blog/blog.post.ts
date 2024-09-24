import { Hono } from 'hono'
import getuserid from '../../Middleware/getuserid'
import { PrismaClient } from '@prisma/client/edge'

type Variable = {
    id: string
}

const app = new Hono<{
    Variables: Variable,
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>

app.post('/', getuserid, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    })

    const userid = c.get('id')

    try {
        const newPost = await prisma.post.create({
            data: {
                title: 'Get Started!',
                content: "Type here....",
                authorid: userid
            }
        })

        c.status(200)
        return c.json({ newPost, msg: "New post created" })
    } catch (error) {
        c.status(400)
        return c.json({ error, msg: "New post created" })
    }

})

export default app