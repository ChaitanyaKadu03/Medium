import z from 'zod'
import { IUserSignup } from '../Interface/IUserSignup'

const userSignupZod = z.object({
    email: z.string().email(),
    name: z.string().min(3, "The length of name is incorrect"),
    password: z.string().min(3, "The length of password is incorrect"),
})

async function checkUserSignup({ email, name, password }: IUserSignup): Promise<boolean> {
    const response = userSignupZod.safeParse({ email, name, password })
    return response.success
}

export default checkUserSignup