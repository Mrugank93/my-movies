import connectMogoDB from "@/libs/dbConnect";
import Movie, { movieSchemaZod } from "@/models/movie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        const { id: page } = params;
        console.log(page);
        await connectMogoDB();
        const movies = await Movie.find().skip((page - 1) * 8).limit(8).sort({ _id: -1 });
        if (!movies) {
            return NextResponse.json({ data: [], message: "No movies found", success: false }, { status: 404 });
        }
        return NextResponse.json({ data: movies, message: "my movies", success: true, }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: error, message: "Something went wrong", success: false }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: any }) {
    try {
        await connectMogoDB();
        const { id } = params;
        if (!id) {
            return NextResponse.json({ data: [], message: "No movie id found", success: false }, { status: 404 });
        }
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
        Movie.findByIdAndUpdate(id, { title, year, image });
        return NextResponse.json({ data: movieData, message: "movie update succesfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: error, message: "Something went wrong", success: false }, { status: 500 });
    }
}