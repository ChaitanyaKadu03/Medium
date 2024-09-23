import { Hono } from 'hono'

const app = new Hono()

app.put('/', async (c) => {
    return c.text("put")
})

export default app