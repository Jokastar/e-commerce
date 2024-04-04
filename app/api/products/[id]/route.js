import Product from "@/app/schemas/Product";
import rest from "../../../lib/rest"; 
import isAdmin from "@/app/lib/isAdmin";
import { NextResponse } from "next/server";
import { productSchema } from "@/app/schemas/zodSchema/productSchema";
import dbConnect from "../../../lib/db"; 

await dbConnect(); 

const restAPI = new rest(Product); 

export async function PATCH(request, context){ 
    //check if Id is present 
    const {id} = context.params;
    if(!id) return NextResponse.json({error:"Bad request", message:"provide product id"}, {status:400})
    //check if user is admin
    if(!isAdmin(request)) return NextResponse.json({error:"not admin"}, {status:401}); 
    const updatedProduct = await request.json();
     
    const result = productSchema.safeParse(updatedProduct);

    if (!result.success) return NextResponse.json({ error: result.error });
    
    return restAPI.put(id, updatedProduct); 
}

export async function GET(request, context){
    //check if Id is present 
    const {id} = context.params;
    if(!id) return NextResponse.json({error:"Bad request", message:"provide product id"}, {status:400}) 
    return restAPI.get(id); 
}

export async function DELETE(request, context){ 
    const {id} = context.params;
    if(!id) return NextResponse.json({error:"Bad request", message:"provide product id"}, {status:400})
    if(!isAdmin(request)) return NextResponse.json({error:"not admin"}, {status:401});  
    return restAPI.delete(id); 
}