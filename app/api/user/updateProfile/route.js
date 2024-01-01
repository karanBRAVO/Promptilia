import { connectToDB } from "@app/lib/database";
import { authModel } from "@app/lib/models/auth.model.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import bcrypt from "bcrypt";

export const POST = async (req, res) => {
  try {
    // getting the session details
    const token = await getToken({ req });
    const session = await getServerSession(authOptions);
    if (!token || !session) throw new Error(`Not authenticated`);

    // connect to db
    await connectToDB();

    // finding the user in db
    const user = await authModel.findOne({
      username: session.user.name,
      email: session.user.email,
    });
    if (!user) throw new Error(`User not found`);

    // getting the updated details
    const { name, password } = await req.json();
    if (!name || !password) throw new Error(`Invalid username or password`);

    // checking the user method of sign in
    if (user.method !== "credentials") {
      throw new Error(`Only credential users are allowed to update`);
    }

    // updating the user details
    await authModel.updateOne(
      { _id: user._id },
      { $set: { username: name, password: bcrypt.hashSync(password, 10) } }
    );

    return NextResponse.json({
      success: true,
      message: "Profile has been updated.",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
