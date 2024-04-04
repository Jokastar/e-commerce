import {z} from "zod"; 

const userSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(2, { message: 'Password must be at least 2 characters long' })
});

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(2, { message: 'Password must be at least 2 characters long'})
});

  module.exports = {
    userSchema:userSchema,
    loginUserSchema: loginUserSchema
  }; 