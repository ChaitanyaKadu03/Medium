import { Hono } from 'hono'

const app = new Hono()

app.post('/', async (c) => {
    return c.text("Signin")
})

export default app