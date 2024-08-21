import connectMogoDB from "@/libs/dbConnect";
import Movie, { movieSchemaZod } from "@/models/movie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectMogoDB();
        const { title, year, image } = await req.json();
        const movieData = movieSchemaZod.pick({
            title: true,
            image: true,
            year: true,
        });
        const { success, error } = movieData.safeParse({ title, year, image });
        if (!success) {
            return NextResponse.json({ data: [error], message: "Invalid inputs", success: false }, { status: 404 });
        }
        Movie.create({ title, year, image });
        return NextResponse.json(movieData, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        await connectMogoDB();
        const movies = await Movie.find();
        if (!movies) {
            return NextResponse.json({ message: "No movies found" }, { status: 404 });
        }
        return NextResponse.json(movies, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}