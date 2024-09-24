import z from 'zod'
import { IBlog } from '../Interface/IBlog'

const blogZod = z.object({
    title: z.string(),
    content: z.string(),
    authorid: z.string(),
})

async function checkBlog({ title, content, authorid }: IBlog): Promise<boolean> {
    const response = blogZod.safeParse({ title, content, authorid })
    return response.success
}

export default checkBlog