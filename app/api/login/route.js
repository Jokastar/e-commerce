import User from "../../schemas/User"; 
import { NextResponse } from "next/server";
import genereateJwtToken from "../../lib/generateJwtToken"; 
import dbConnect from "../../lib/db"; 
import {loginUserSchema} from "../../schemas/zodSchema/userSchema"; 
 
import bcrypt from "bcrypt"

//Connect to the db
await dbConnect(); 

export async function POST(request){
    //verify if the user is already connected 
    let userPayload = request.cookies.get("user")?.value;
    console.log(userPayload); 
    if(userPayload) return NextResponse.json({error:"user already connected"}, {status:409}); 

    //Verify the validity of the payload with zod
    const {email, password} = await request.json();

    const result = loginUserSchema.safeParse({ email, password });
   
    if (!result.success) return NextResponse.json({ error: result.error }, {status:401});

    try{
        //verify if the user exist
        let user = await User.findOne({email:email})
        if(!user) return NextResponse.json({error:"email or password incorrect"}, {status:401}); 

        //verify if the password match
        let match = await bcrypt.compare(password, user.password)
        if(!match) return NextResponse.json({error:"email or password incorrect"}, {status:401});  

        //send back a jwt token
        let token = await genereateJwtToken(user);
        return NextResponse.json({token:token}, {status:200}); 

    }catch(e){
        return NextResponse.json({error:e.message}, {status:500})
    }
    
}
