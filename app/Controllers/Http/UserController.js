'use strict'
const User = use('App/Models/User')

class UserController {
    async index() {
        const users = await User.all();
        return users;
    }
    async store({ request, response }) {
        const data = request.only(["name", "email", "password"]);
        const user = await User.findOrCreate({ email: data.email}, data);
        return user;
    }
    async show({params, response }) {
        try {
            const user = await User.findByOrFail("id", params.id);
            return user; 
        }   catch (error){
            response.status(error.status).json({ erro: "Usuário não encontrado" });
        }
    }
    async update({ request, params, response }) {
        try {
            const data = request.only(["name", "email", "password"]);
            const user = await User.findByOrFail('id', params.id);
            user.merge(data);
            await user.save();
            return user;
        }   catch (error) {
            response.status(error.status).json({ erro: "Usuário não encontrado!" });
        } 
    }
    async destroy({params, response}){
        try {
            const user = await User.findByOrFail('id', params.id);
            await user.delete();
            return response.json({ sucesso: "Usuário removido!"});
        }   catch (error) {
            return response.status(error.status).json({ erro: "Usuário não encontrado!" });
        }
    }
}

module.exports = UserController
