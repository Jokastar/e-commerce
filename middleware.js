import {NextResponse} from "next/server"; 
import * as jose from "jose";

export  async function middleware(request){
    const response = NextResponse.next();
    try{
        const accessToken = request.headers.get("Authorization")?.replace("Bearer", "").trim(); 
    
        const secretKey = new TextEncoder().encode(process.env.JOSE_SECRET_KEY)
        const regex = /^\/api\/products(?:\/.*)?$/

        // /api/products/* routes
        if(request.method === "GET" && regex.test(request.nextUrl.pathname)){
            return response; 
        } 

        //check if token is present
        if(!accessToken){
            if(request.nextUrl.pathname === "/api/login" || request.nextUrl.pathname === "/api/signin"){
                //delete previous token present in the cookies
                response.cookies.delete("user"); 
        
                return response; 
            } 
            return NextResponse.json({error:"no token provided"}, {status:401}); 
        } 

        // decode the token
        const {payload:{user}} = await jose.jwtVerify(accessToken, secretKey);
        let userStringify = JSON.stringify(user);
        response.cookies.set("user", userStringify);
        return response; 

    }catch(e){

        if(e.name == "JWSInvalid"){
            return NextResponse.json({error: e.name}, {status:401})

        }else if(e.name == "JWTExpired"){
            //if token expires create a new token and delete old user cookies 
            return NextResponse.json({error:"token expired"}, {status:401})
        }
        return NextResponse.json({error:e}, {status:500})
    }
   
}

export const config = {
    matcher: [
        "/api/login",
        "/api/signin",
        "/api/produts",
        "/api/products/:id",
        "/api/users",
        "/api/users/:id"
    ]
}