
import { NextResponse } from "next/server";

import rest from "../../../lib/rest";
import isUser from "@/app/lib/isUser";
import hashPassword from "@/app/lib/hashPassword";

import User from "../../../schemas/User"; 
import {userSchema} from "../../../schemas/zodSchema/userSchema"; 

const restAPI = new rest(User); 

export async function PATCH(request, context){
    const {id} = context.params;
    if(!id) return NextResponse.json({error:"Bad request", message:"provide user id"}, {status:400})
    //verify if ID and userID match 
    if(isUser(request, id) === false) return NextResponse.json({error:"not user"}, {status:401}); 
    const updatedUser = await request.json();

    //hash the password
    if(updatedUser.password){
        const hashedPassword = await hashPassword(updatedUser.password); 
        updatedUser.password = hashedPassword; 
    }
      
    //check validity of the payload
    const result = userSchema.safeParse(updatedUser);

    if (!result.success) return NextResponse.json({ error: result.error });
    
    return restAPI.put(id, updatedUser); 
}

export async function GET(request, context){ 
    const {id} = context.params; 
    if(!id) return NextResponse.json({error:"Bad request", message:"provide user id"}, {status:400})
    return restAPI.get(id); 
}

export async function DELETE(request, context){
    const {id} = context.params;
    if(!id) return NextResponse.json({error:"Bad request", message:"provide user id"}, {status:400})
    if(isUser(request, id) === false) return NextResponse.json({error:"not user"}, {status:401}); 
      
    return restAPI.delete(id); 
}