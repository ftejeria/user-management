import jwt from 'jsonwebtoken'

export const userAuth = (req, res, next) => {
  const authorization = req.headers.authorization

  let token = {}
  let decodedToken

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.split(' ')[1]
  }
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).send({
      error: 'Invalid token'
    })
  }

  if (!(decodedToken || token)) {
    return res.status(401).send({
      error: 'Invalid token'
    })
  }
  req.userId = decodedToken.id

  next()
}
