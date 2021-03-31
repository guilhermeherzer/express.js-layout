const bcrypt = require('bcryptjs')

module.exports = { create }

async function create(params) {
    const { User } = require('./../models')

    // validate
    if (await User.findOne({ where: { email: params.email } })) {
        const success = 0
        const message = 'O email "' + params.email + '" já existe.'
        return { success, message }
    }

    // hash password
    if (params.password) {
        var salt = bcrypt.genSaltSync(10)
        params.password = await bcrypt.hashSync(params.password, salt)
    }

    // save user
    try{
        await User.create(params)
        const success = 1
        const message = 'Cadastro realizado com sucesso'
        return { success, message }
    }catch (e){
        const success = 0
        const message = 'Erro ' + e
        return { success, message }
    }
}