const AppError = require("../utils/AppError")

// roleToVerify = admin ou costumer

function verifyUserAuthorization(roleToVerify){ // verifica se o usuario tem perfil de admin
    return (request, response, next)=>{
        const {role}=request.user

        if(!roleToVerify.includes(role)){
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }
}

module.exports = verifyUserAuthorization