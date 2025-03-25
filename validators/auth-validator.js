const { z } = require('zod'); // Correct import with lowercase 'z'

const signupSchema = z.object({ // Use 'z.object' instead of 'Z.Object'
  username: z.string({ required_error: "Name is required" })
    .trim()
    .min(3, "Name must be at least 3 characters"),
  email: z.string({ required_error: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  phone: z.string({ required_error: "Phone is required" })
    .trim()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z.string({ required_error: "Password is required" })
    .trim()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

module.exports = signupSchema;