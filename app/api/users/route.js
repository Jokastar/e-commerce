
import { NextResponse } from "next/server";

import rest from "../../lib/rest.js"
import isAdmin from "../../lib/isAdmin"  
import dbConnect from "../../lib/db"; 
import hashPassword from "@/app/lib/hashPassword.js";

import {userSchema} from "../../schemas/zodSchema/userSchema";
import User from "../../schemas/User"; 

await dbConnect(); 

const restAPI = new rest(User); 
 
export async function GET(){
  return restAPI.get()
}

export async function POST(request){
  //verify is user is admin
  if(isAdmin(request) === false) return NextResponse.json({error:"not admin"}, {status:401}); 

  //hash the password
   const payload =  await request.json();
   const hashedPassword = await hashPassword(payload.password);
   payload.password = hashedPassword; 

  //check validity of the payload
   const result = userSchema.safeParse(payload);
   if (!result.success) return NextResponse.json({ error: result.error }); 
   
   //verify if the user already exist
   const userExist =  await User.findOne({email:payload.email}); 
   if(userExist) return NextResponse.json({error:"user already exist"},{status:409}); 
   return restAPI.post(payload)
}