import { PrismaClient } from "@prisma/client/edge";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

const getuserid = createMiddleware(async (c, next) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    })

    const token = c.req.header().authorization

    const JWTSECRET: string = c.env.JWT_SECRET

    const userDataJwt = await verify(token, JWTSECRET)

    if (!userDataJwt.email) {
        c.status(400)
        return c.json({ msg: "Could not verify the token" })
    }

    const theEmail = userDataJwt.email.toString()

    const userDataDb = await prisma.user.findUnique({ where: { email: theEmail } })

    if (!userDataDb) {
        c.status(400)
        return c.json({ msg: "Could not find the user" })
    }

    c.set('id', userDataDb.id)

    await next()
})

export default getuserid