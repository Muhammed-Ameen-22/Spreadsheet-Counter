import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {

    
    //throw error if cookie is null
    if (!req.cookies.token) {
        console.log('isLogg',req)
        console.log('isLogg2',req.cookies)
        console.log('isLogg3',req.cookies.token)
        const response = { "Status": "Failure", "Reason": "Please login first" }
        return res.status(400).send(response)
    }
    try {
 
        //verify the jwt
        const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);  
        const { userName, userId } = user;
        req.user = { userName, userId };
        

    } catch (error) {
        const response = { "Status": "Failure", "Reason": "Bad Request" }
        return res.status(400).send(response)
    }
    next();
};