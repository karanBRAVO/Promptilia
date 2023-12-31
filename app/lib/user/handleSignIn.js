import { connectToDB } from "@app/lib/database";
import { authModel } from "@app/lib/models/auth.model";
import bcrypt from "bcrypt";

export const handleSignIn = async ({ username, email, password }) => {
  try {
    // connect to database
    await connectToDB();

    // login user if exists
    const user = await authModel.findOne({ username, email });
    if (user) {
      // comparing the password
      if (bcrypt.compareSync(password, user.password)) {
        let userData = {
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
      throw new Error(`Password mismatch.`);
    }

    // create new user if do not exists
    await new authModel({
      email,
      password: bcrypt.hashSync(password, 10),
      username,
    }).save();

    const newUser = await authModel.findOne({ username, email });
    let userData = {
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
