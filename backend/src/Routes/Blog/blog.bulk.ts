import { PrismaClient } from '@prisma/client/edge'
import { Hono } from 'hono'

type Variable = {
    id: string
}

const app = new Hono<{
    Variables: Variable
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>

app.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    })

    try {
        const response = await prisma.post.findMany()

        c.status(200)
        return c.json(response)
    } catch (error) {
        c.status(400)
        return c.json({ msg: "Failed to find the posts", error })
    }
})

export default app