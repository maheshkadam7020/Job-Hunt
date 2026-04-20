import jwt from 'jsonwebtoken';

const isAuthicated=async (req,resp,next)=>
{
    try {
        const token =req.cookies.token;
    if(!token)
    {
        return resp.status(401).json(
            {
                message:"User is not Authicated",
                success:false
            }
        )
    }

    const decode= jwt.verify(token,process.env.scret_key);
   
    if(!decode)
    {
        return resp.status(401).json(
            {
                message:"Invalid token.",
                success:false

            }
        )
    }
    req.id=decode.userid;
    
    next();
    } catch (error) {
        console.log(error);
        
    }
}
export default isAuthicated;