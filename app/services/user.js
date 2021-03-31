const bcrypt = require('bcryptjs')
const { User } = require('./../models')

module.exports = { authenticate, create }

async function authenticate({ email, password }) {
    const user = await User.findOne({ where: { email: email } });
    
    if (!user || !(await bcrypt.compareSync(password, user.password))){
        const success = false
        const message = "Usuário ou senha incorreta."
        return { success, message }
    }
    
    // authentication successful
    const success = true
    const message = "Sucesso!"
    return { user, success, message }
}

async function create(params) {
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