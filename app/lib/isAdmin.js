export default function isAdmin(request){
    let user = request.cookies.get("user")?.value; 
    let payload = user && JSON.parse(user); 
    return payload && payload.role === "admin"; 
}