import { Hono } from 'hono'
import getuserid from '../../Middleware/getuserid'
import checkBlog from '../../Zod/blog'
import { PrismaClient } from '@prisma/client/edge'

interface inputs {
    title: string,
    content: string,
    postId: string
}

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

app.put('/', getuserid, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    })
    
    const { title, content, postId }: inputs = await c.req.json()
    const authorid = c.get('id')
    
    if (!checkBlog({ title, content, authorid })) {
        c.status(400)
        return c.json({ msg: "Inputs are invalid" })
    }
    
    try {
        const updatedBlog = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title, content, authorid
            }
        })
        
        c.status(200)
        return c.json(updatedBlog)
    } catch (error) {
        c.status(400)
        return c.json({ msg: "Failed to update" })
    }
})

export default app