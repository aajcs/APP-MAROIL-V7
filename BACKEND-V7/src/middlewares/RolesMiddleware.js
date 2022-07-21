const ControllerRolesCtrl = {}

ControllerRolesCtrl.isSuperAdmin = async (req, res, next) => {
  try {
    const roles = req.user.roles

    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === 'SUPERADMIN') {
        next()
        return
      }
    }
    return res.status(403).json({ message: 'Requerido el Rol superadmin' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
}
ControllerRolesCtrl.isAdmin = async (req, res, next) => {
  try {
    const roles = req.user.roles

    for (let i = 0; i < roles.length; i++) {
      if (roles[i] === 'SUPERADMIN' || roles[i] === 'ADMIN') {
        next()
        return
      }
    }
    return res.status(403).json({ message: 'Requerido el Rol Admin' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
}
ControllerRolesCtrl.isOperador = async (req, res, next) => {
  try {
    const roles = req.user.roles

    for (let i = 0; i < roles.length; i++) {
      if (
        roles[i] === 'SUPERADMIN' ||
        roles[i] === 'ADMIN' ||
        roles[i] === 'OPERADOR'
      ) {
        next()
        return
      }
      console.log(roles[0])
    }
    return res.status(403).json({ message: 'Requerido el Rol Operador' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
}
ControllerRolesCtrl.isLectura = async (req, res, next) => {
  try {
    const roles = req.user.roles

    for (let i = 0; i < roles.length; i++) {
      if (
        roles[i] === 'SUPERADMIN' ||
        roles[i] === 'ADMIN' ||
        roles[i] === 'OPERADOR' ||
        roles[i] === 'LECTURA' ||
        roles[i] === 'CLIENTE'
      ) {
        next()
        return
      }
      console.log(roles[0])
    }
    return res.status(403).json({ message: 'Requerido el Rol Operador' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
}
module.exports = ControllerRolesCtrl
