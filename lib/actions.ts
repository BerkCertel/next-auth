"use server";

import db from "./db/db";
import { executeAction } from "./executeAction";
import { schema } from "./schema";

const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const validatedData = schema.parse({ email, password });

      await db.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          password: validatedData.password,
        },
      });

      // Validate email and password
      if (!validatedData.email || !validatedData.password) {
        throw new Error("Email and password are required");
      }

      // Simulate user creation logic (e.g., database insertion)
      // This is where you would typically call your database to create a user
      console.log(
        `Creating user with email: ${email} and password: ${password}`
      );

      // Return a success message or user object
      return { message: "User created successfully", email };
    },
  });
};

export { signUp };
