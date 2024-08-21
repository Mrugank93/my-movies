import connectMogoDB from "@/libs/dbConnect";
import User, { userSchemaZod } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectMogoDB();
        const { email, password } = await req.json();
        const loginData = userSchemaZod.pick({
            email: true,
            password: true,
        });
        const { success, error } = loginData.safeParse({ email, password });
        if (!success) {
            return NextResponse.json({ data: [error], message: "Invalid inputs", success: false }, { status: 404 });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (user.password !== password) {
            return NextResponse.json({ message: "Password incorrect" }, { status: 401 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}