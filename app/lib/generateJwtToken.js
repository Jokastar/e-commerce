import jwt from "jsonwebtoken"
import * as jose from 'jose';


export default async function generateJwtToken(user) {
    // Create the payload (claims) for the JWT token
    const payload = {
        userId: user.id,
        role: user.role,
    };

    const secretKey = new TextEncoder().encode(process.env.JOSE_SECRET_KEY)
    const alg = process.env.ENCRYPT_ALG; 

    // Sign the payload to create the JWT token
    const expiresIn = '2h'; // Token expiration time
    try {
        const jwt = await new jose.SignJWT({user:payload})
        .setExpirationTime(expiresIn)
        .setProtectedHeader({alg:alg})
        .sign(secretKey)
        return jwt; 
    } catch (error) {
        // rewrite this part
        console.log(error); 
    }
}