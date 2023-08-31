const { User, Followship } = require('../models')
const helpers = require('../_helpers')

const followshipController = {
  followUser: async (req, res, next) => {
    try {
      const followingId = req.body.id
      const followerId = helpers.getUser(req).id
      if (followingId === followerId) throw new Error('無法跟隨自己!')

      const user = await User.findByPk(followingId)
      if (!user) {
        const err = new Error('被跟隨者不存在!')
        err.status = 404
        throw err
      }
      const followship = await Followship.findOne({ where: { followerId, followingId } })
      if (followship) throw new Error('已跟隨該使用者!')

      const newFollowship = await Followship.create({ followerId, followingId })
      return res.json({ status: 'success', data: { followship: newFollowship } })
    } catch (err) {
      return next(err)
    }
  },

  unfollowUser: (req, res, next) => {
    const followingId = req.params.followingId
    const followerId = helpers.getUser(req).id

    Promise.all([
      User.findByPk(followingId),
      Followship.findOne({ where: { followerId, followingId } })
    ])
      .then(([user, followship]) => {
        if (!user) {
          const err = new Error('使用者不存在!')
          err.status = 404
          throw err
        }
        if (!followship) throw new Error('沒有跟隨過此使用者!')
        return followship.destroy()
      })
      .then(deletedFollowship => res.json({ status: 'success', data: { followship: deletedFollowship } }))
      .catch(err => next(err))
  }
}

module.exports = followshipController
