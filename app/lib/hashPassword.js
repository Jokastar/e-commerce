import bcrypt from "bcrypt"; 

const salt =  parseInt(process.env.BCRYPT_SALT); 

export default async function hashPassword(password){
    try{
        const hashedPassword = await bcrypt.hash(password, salt); 
        return hashedPassword;

    }catch(e){
        //to be revised
       console.log(e)
    }
     
}