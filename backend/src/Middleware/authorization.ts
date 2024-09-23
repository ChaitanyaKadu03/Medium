import { PrismaClient } from "@prisma/client/extension"
import { createMiddleware } from "hono/factory"
import { verify } from "hono/jwt"

const authorization = createMiddleware(async (c, next): Promise<any> => {
    const value: string = c.req.header().authorization

    const JWTSECRET: string = c.env.JWT_SECRET

    try {
        await verify(value, JWTSECRET)

        c.status(200)
        return next()
    } catch (error) {
        c.status(400)
        return c.json({ msg: "Authentification Failed!" })
    }
})

export default authorization