async function handleTokenExpiration(request, response) {
    try {
        // Perform token refresh logic here, such as generating a new token
        const newToken = await generateNewToken();

        // Update the user cookie with the new token
        response.cookies.set("user", newToken);

        // Return the response with the new token
        return response;
    } catch (error) {
        return NextResponse.json({error:"token refresh failed"}, {status:401});
    }
}