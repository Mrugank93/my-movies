import connectMogoDB from "@/libs/dbConnect";
import Movie, { movieSchemaZod } from "@/models/movie";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1'); // Retrieve the 'page' query parameter
        await connectMogoDB();

        const movieCount = await Movie.countDocuments();
        const movies = await Movie.find()
            .skip((page - 1) * 8)
            .limit(8)
            .sort({ _id: -1 });

        if (!movies || movies.length === 0) {
            return NextResponse.json({ data: [], message: "No movies found", success: false }, { status: 404 });
        }

        return NextResponse.json({ data: movies, totalData: movieCount, message: "Movies retrieved successfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: error, message: "Something went wrong", success: false }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectMogoDB();
        const { title, year, image } = await req.json();
        const movieData = movieSchemaZod.pick({
            title: true,
            year: true,
        });
        const { success, error } = movieData.safeParse({ title, year });
        if (!success) {
            return NextResponse.json({ data: [error], message: "Invalid inputs", success: false }, { status: 404 });
        }
        await Movie.create({ title, year, image });
        return NextResponse.json({ data: { title, year, image }, message: "Movie created successfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: error, message: "Something went wrong", success: false }, { status: 500 });
    }
}
