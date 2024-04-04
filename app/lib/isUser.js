export default function isUser(request, id ){
    const user = JSON.parse(request.cookies.get("user").value);
    
    return user.userId === id
}