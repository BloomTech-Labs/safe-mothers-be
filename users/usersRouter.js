const router = require('express').Router()

const Users = require('./usersHelper')

router.get('/', (req, res) => {
  Users.getUsers()
    .catch(err => {
      res.status(200).json({ message: 'Error getting users' })
    })
    .then(users => {
      res.status(200).json(users)
    })
})

router.get('/:id', (req, res) => {
  let { id } = req.params

  Users.findBy({ id })
    .catch(error => {
      res.status(500).json(error)
    })
    .then(users => {
      if (users.length === 0) {
        return res
          .status(404)
          .json({ message: `No user with the ID of ${id}` })
      }

      const user = users[0]
      res.status(200).json({
        name: user.name,
        username: user.username
      })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  Users.deleteUser(id)
    .catch(err => {
      res.status(500).json({ message: `Error deleting user: ${err}` })
    })
    .then(numChanges => {
      if (numChanges === 0) {
        return res
          .status(404)
          .json({ message: `Could not delete user with ID ${id}` })
      } else {
        return res
          .status(200)
          .json({ message: `User with ID ${id} has been deleted` })
      }
    })
})

module.exports = router
