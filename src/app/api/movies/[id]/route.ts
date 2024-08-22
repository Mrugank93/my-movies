import connectMogoDB from "@/libs/dbConnect";
import Movie, { movieSchemaZod } from "@/models/movie";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: any }) {
    try {
        const { id } = params;
        await connectMogoDB();
        const movie = await Movie.findById(id);
        if (!movie) {
            return NextResponse.json({ data: null, message: "Movie not found", success: false }, { status: 404 });
        }
        return NextResponse.json({ data: movie, message: "Movie found", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: error, message: "Something went wrong", success: false }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: any }) {
    try {
        const { id } = params;
        await connectMogoDB();
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            return NextResponse.json({ data: null, message: "Movie not found", success: false }, { status: 404 });
        }
        return NextResponse.json({ data: movie, message: "Movie deleted successfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: error, message: "Something went wrong", success: false }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: any }) {
    try {
        await connectMogoDB();
        const { id } = params;
        const { title, year, image } = await req.json();
        const movieData = movieSchemaZod.pick({
            title: true,
            year: true,
        });
        const { success, error } = movieData.safeParse({ title, year });
        if (!success) {
            return NextResponse.json({ data: [error], message: "Invalid inputs", success: false }, { status: 404 });
        }
        await Movie.findByIdAndUpdate(id, { title, year, image });
        return NextResponse.json({ data: { title, year, image }, message: "Movie Updated successfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: error, message: "Something went wrong", success: false }, { status: 500 });
    }
}
