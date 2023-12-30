import { connectToDB } from "@app/lib/database";
import { authModel } from "@app/lib/models/auth.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const setAuthToken = (key, msg) => {
  const token = jwt.sign({ id: key }, process.env.JWT_SECRET_KEY);
  const response = NextResponse.json({
    success: true,
    message: `${msg} | Token sent`,
  });
  response.cookies.set("token", token);
  return response;
};

export const POST = async (request) => {
  try {
    const { username, email, password } = await request.json();

    await connectToDB();

    const user = await authModel.findOne({ username, email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return setAuthToken(user._id, "User found");
      }
      throw new Error(`Password mismatch.`);
    }

    await new authModel({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    }).save();

    const new_user = await authModel.findOne({ username, email });
    return setAuthToken(new_user._id, "User created");
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
};
