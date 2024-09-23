import { Hono } from 'hono'

const app = new Hono()

app.post('/', async (c) => {
    return c.text("post")
})

export default app