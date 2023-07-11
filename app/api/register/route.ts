import bcypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import {NextResponse} from 'next/server'
import {Simulate} from "react-dom/test-utils";

export const POST = async (req: Request) => {
    const body = await req.json()
    console.log(body)
    const {email, name, password} = body

    const hashedPassword = await bcypt.hash(password, 6)

    const user = await prisma.user.create({
        data: {
            email, name, hashedPassword
        }
    })
    return NextResponse.json(user)
}