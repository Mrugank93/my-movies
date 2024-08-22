import connectMogoDB from "@/libs/dbConnect";
import Movie, { movieSchemaZod } from "@/models/movie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectMogoDB();
        const data = await req.formData();
        const image = data.get("image");
        if (!image || !(image instanceof File)) {
            return NextResponse.json({ data: [], message: "No image found or invalid file", success: false }, { status: 404 });
        }

        const bufferData = await image.arrayBuffer();
        const imageBuffer = Buffer.from(bufferData);
        const { title, year } = Object.fromEntries(data.entries());

        const movieData = movieSchemaZod.pick({
            title: true,
            year: true,
        });

        const { success, error } = movieData.safeParse({ title, year });
        if (!success) {
            return NextResponse.json({ data: [error], message: "Invalid inputs", success: false }, { status: 404 });
        }

        await Movie.create({ title, year, image: imageBuffer });

        return NextResponse.json({ data: { title, year }, message: "Movie created successfully", success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ data: error, message: "Something went wrong", success: false }, { status: 500 });
    }
}
