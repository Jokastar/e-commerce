import { NextResponse } from "next/server";
export default class Crud{
    constructor(entity){
        this.entity = entity; 
    }
     
    async get(id) {
        let query = id ? {_id:id}: null; 
            try{
                const entity = await this.entity.find(query);
                
                if(entity.length > 0) return NextResponse.json(entity, {status:200}); 

                return NextResponse.json({error:"Element not found"}, {satuts:401});
                
            }catch(e){
                return NextResponse.json({error:e.message}, {status:500}); 
            } 
    }

    async post (payload){
        // TO DO: if entity === User do not resend the password
        try{
            const newEntity = new this.entity(payload) 
            await newEntity.save();
            return NextResponse.json(newEntity, {status:201});  
        
           }catch(e){
                return NextResponse.json({error:e.message}, {status:500})
           }
    }

    async put(id, payload){
        // TO DO: if entity === User do not resend the password
        try{
            const updatedEntity = await this.entity.findOneAndUpdate({_id:id}, payload, {new:true});
            if(updatedEntity) return NextResponse.json({updatedEntity}, {status:201})    
            return NextResponse.json({error:"Element not found"}, {status:404}); 
             
        }catch(e){
            return NextResponse.json({error:e}, {status:500}); 
        }
        
    }

    async delete(id){
        try{
            const deleteEntity = await this.entity.deleteOne({_id:id}, {new:true});
            if(deleteEntity.deletedCount > 0) return NextResponse.json({deleteEntity}, {status:200}); 
            return NextResponse.json({error:"Element not found"}, {status:404});
    
        }catch(e){
            return NextResponse.json({error:e.message}, {status:500}); 
        }
    }
}