const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const knex = require("../database/knex");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first(); // busca no banco

    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({role: user.role}, secret, { // repassar para dentro do token o perfil do usuario (role: user.role)
      subject: String(user.id),
      expiresIn
    });

    response.cookie("token", token, 
      {
        httpOnly: ture,
        sameSite: 'Strict',
        secure: true,
        maxAge: 15 * 60 * 1000
      }); // faz com que o token sejá lindo somente através de requisições http entre cliente e servidor

    delete user.password; // retirar o password antes de enviar o user

    response.status(201).json({ user });
  }
}

module.exports = SessionsController;