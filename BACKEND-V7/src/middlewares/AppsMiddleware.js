// algo parecido al mideeleware de roles paar las rutas de aplicaciones
const ControllerAppsCtrl = {}

ControllerAppsCtrl.isAppControl = async (req, res, next) => {
  try {
    const apps = req.user.apps

    for (let i = 0; i < apps.length; i++) {
      if (apps[i] === 'SUPERAPPS' || apps[i] === 'CONTROLAPPS') {
        next()
        return
      }
    }
    return res.status(403).json({ message: 'No tiene permiso para esta App' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
}
ControllerAppsCtrl.isAppAdministracion = async (req, res, next) => {
  try {
    const apps = req.user.apps

    for (let i = 0; i < apps.length; i++) {
      if (apps[i] === 'SUPERAPPS' || apps[i] === 'AMINISTRACIONAPPS') {
        next()
        return
      }
    }
    return res.status(403).json({ message: 'No tiene permiso para esta App' })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error })
  }
}
ControllerAppsCtrl.isAdmin = async (req, res, next) => {
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
ControllerAppsCtrl.isOperador = async (req, res, next) => {
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
module.exports = ControllerAppsCtrl
