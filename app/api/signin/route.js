
import { NextResponse } from "next/server";
import generateJwtToken from "@/app/lib/generateJwtToken";
import hashPassword from "@/app/lib/hashPassword";

import User from "../../schemas/User";
import { userSchema } from "@/app/schemas/zodSchema/userSchema";

import dbConnect from "../../lib/db";  

//Connect to the db
await dbConnect(); 

export async function POST(request) {
    try {
        //verify if the user is already connected
        let userPayload = request.cookies.get("user")?.value;  
        if(userPayload) return NextResponse.json({error:"user already connected"}, {status:409});
        
        // Get the payload
        const {name, email, password } = await request.json();

        // Verify the validity of the payload with zod
        const result = userSchema.safeParse({ name, email, password });

        if (!result.success) return NextResponse.json({ error: result.error }, {status:500});

        // Verify if the user already exists
        let user = await User.findOne({ email: email });
        if (user) return NextResponse.json({ error: "User already exists" }, {status:401});

        // Hash the password
        const saltRounds = 2;
        const hashPassword = await bcrypt.hash(password, saltRounds); 
        
        //Create a new user
        const newUser = new User({email:email, password:hashPassword, address:{}});
        await newUser.save(); 
        
        // create jsonWebToken and return response
        let token = await generateJwtToken(newUser);
        return NextResponse.json({message:"User created", token:token}, {status:201}); 
        
    } catch (e) {
        return NextResponse.json({ error: e.message }, {status:500});
    }
}
