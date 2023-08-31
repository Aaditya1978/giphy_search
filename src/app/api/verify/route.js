import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  // check token from header
  const token = req.headers.get("authorization");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ message: "Authorized" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
