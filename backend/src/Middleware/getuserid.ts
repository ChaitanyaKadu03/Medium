import { createMiddleware } from "hono/factory";

const getuserid = createMiddleware(async (c, next) => {
    const token = c.req.header().authorization

    console.log(token);
    await next()
})

export default getuserid