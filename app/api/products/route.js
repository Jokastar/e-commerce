import Product from "../../schemas/Product"
import rest from "../../lib/rest.js"
import isAdmin from "../../lib/isAdmin"
import { NextResponse } from "next/server";
import { productSchema } from "@/app/schemas/zodSchema/productSchema";
import dbConnect from "../../lib/db"; 

await dbConnect(); 

const restAPI = new rest(Product); 

export async function GET(){
  return restAPI.get()
}

export async function POST(request){
  
  if(!isAdmin(request)) return NextResponse.json({error:"not admin"}, {status:401}); 
   const payload =  await request.json(); 
   const result = productSchema.safeParse(payload);

  if (!result.success) return NextResponse.json({ error: result.error });
   return restAPI.post(payload)
}

