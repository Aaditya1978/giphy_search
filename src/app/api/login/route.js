import { NextResponse } from "next/server";
import app from "../../../auth/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = jwt.sign(
      { uid: userCredential.user.uid },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    );
    return NextResponse.json({ token: token }, { status: 200 });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return NextResponse.json(
      { error: errorCode, message: errorMessage },
      { status: 401 }
    );
  }
}
