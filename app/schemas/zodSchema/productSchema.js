import {z} from "zod"; 

const productSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    price: z.number().positive({ message: 'Price must be a positive number' }),
    description: z.string().min(2, { message: 'Description must be at least 2 characters long' }),
    quantity: z.number().positive({message:'Price must be a positive number'})
});


  module.exports = {
    productSchema: productSchema
  }
