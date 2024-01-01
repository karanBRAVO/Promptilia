import { connectToDB } from "@app/lib/database";
import { authModel } from "@app/lib/models/auth.model";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const handleSignIn = async ({
  username,
  email,
  password,
  image,
  method,
}) => {
  try {
    // converting username to lower case
    username = String(username).toLowerCase();

    // connect to database
    await connectToDB();

    // login user if exists
    const user = await authModel.findOne({ username, email });
    if (user) {
      // matching previous method and current method of authentication
      if (method !== user.method) {
        throw new Error(`Authentication method ${method}`);
      }

      // checking which method user is using
      if (method === "credentials") {
        // comparing the password
        if (!bcrypt.compareSync(password, user.password)) {
          throw new Error(`Password mismatch.`);
        }
      }
      let userData = {
        id: user._id,
        name: username,
        email,
        image: user.image,
        joined_at: user.createdAt,
      };

      return {
        success: true,
        message: `User found.`,
        userData,
      };
    }

    // generating new password if not provided
    if (method !== "credentials" && !password) {
      password = crypto.randomBytes(16).toString("hex");
    }

    if (!image) image = undefined;

    // create new user if do not exists
    await new authModel({
      email,
      password: bcrypt.hashSync(password, 10),
      username,
      image,
      method,
    }).save();

    const newUser = await authModel.findOne({ username, email });
    let userData = {
      id: newUser._id,
      name: username,
      email,
      image: newUser.image,
      joined_at: newUser.createdAt,
    };

    return {
      success: true,
      message: `User created.`,
      userData,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
