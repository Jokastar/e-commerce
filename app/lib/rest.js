import { NextResponse } from "next/server";
export default class Crud{
    constructor(entity){
        this.entity = entity; 
    }
     
    async get(id) {
        let query = id ? {_id:id}: null; 
            try{
                const entity = await this.entity.find(query).select("-password");
                
                if(entity.length > 0) return NextResponse.json(entity, {status:200}); 

                return NextResponse.json({error:"Element not found"}, {satuts:401});
                
            }catch(e){
                return NextResponse.json({error:e.message}, {status:500}); 
            } 
    }

    async post (payload){
    
        try{
            const newEntity = new this.entity(payload);  
            const savedEntity = await newEntity.save();
            const savedEntityObject = savedEntity.toObject();

            //remove the password from the document
            if(savedEntityObject.password) delete savedEntityObject.password; 
            
            return NextResponse.json(savedEntityObject, {status:201});  
        
           }catch(e){ 
                return NextResponse.json({error:e.message}, {status:500})
           }
    }

    async put(id, payload){
    
        try{
            const updatedEntity = await this.entity.findOneAndUpdate({_id:id}, payload, {new:true});
            
            //remove the password from the document
            if(updatedEntity){
                const savedEntityObject = updatedEntity.toObject();
                if(savedEntityObject.password) delete entityObject.password;

                return NextResponse.json({savedEntityObject}, {status:201}) 
            }    
            return NextResponse.json({error:"Element not found"}, {status:404}); 
             
        }catch(e){
            return NextResponse.json({error:e}, {status:500}); 
        }
        
    }

    async delete(id){
        try{
            const deleteEntity = await this.entity.deleteOne({_id:id}, {new:true});
            if(deleteEntity.deletedCount > 0) return NextResponse.json({message:"user deleted"}, {status:200}); 
            return NextResponse.json({error:"Element not found"}, {status:404});
    
        }catch(e){
            return NextResponse.json({error:e.message}, {status:500}); 
        }
    }
}