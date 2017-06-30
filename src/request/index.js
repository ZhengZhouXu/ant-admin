import axios from 'axios'
import qs from 'qs'

const sf = qs.stringify
const post = axios.post

var loginRequest = {
  login (username, password, code) {
    return post('/admin/login/login', sf({username, password, code}))
  },
  isLogin () {
    return post('/admin/login/IsLogin')
  }
}

var indexRequest = {
  getPowers () {}
}

var addPageRequest = {
  allTableName () {
    return post('/addpage/AllTableName')
  },
  tableProp (tableName) {
    return post('/addpage/TableProp', sf({tableName}))
  },
  allPowerFunction () {
    return post('/addpage/AllPowerFunction')
  }
}

var memberManageRequest = {
  memberList (page) {
    return post('/admin/Member/MemberList', sf({page}))
  },
  forbid (userIds) {
    return post('/admin/Member/ChangeMemberStatus', sf({userIds, status: 1}))
  },
  recover (userIds) {
    return post('/admin/Member/ChangeMemberStatus', sf({userIds, status: 0}))
  },
  resetPassword (userIds) {
    return post('/admin/Member/ResetPassword', sf({userIds}))
  },
  resetPayPassword (userIds) {
    return post('/admin/Member/ResetPayPassword', sf({userIds}))
  },
  search (param) {
    return post('/admin/Member/Search', sf(param))
  }
}

var messageManageRequest = {
  search (param) {
    return post('/admin/MessageManage/search', sf(param))
  },
  del (ids) {
    return post('/admin/MessageManage/delete', sf({ids}))
  }
}

var communityManageRequest = {
  search (param) {
    return post('/admin/Community/search', sf(param))
  },
  dissolve (ids) {
    return post('/admin/Community/Dissolve', sf({ids}))
  },
  recover (ids) {
    return post('/admin/Community/Recover', sf({ids}))
  }
}

var communityTopicRequest = {
  search (param) {
    return post('/admin/CommunityTopic/Search', sf(param))
  },
  deleteTopic (ids) {
    return post('/admin/CommunityTopic/DeleteTopic', sf({ids}))
  },
  recoverTopic (ids) {
    return post('/admin/CommunityTopic/RecoverTopic', sf({ids}))
  }
}

var giftManageRequest = {
  getGitfList () {
    return post('/admin/GiftManage/GetGiftList')
  },
  modifyGift (id, name, price) {
    return post('/admin/GiftManage/ModifyGift', sf({id, name, price}))
  }
}

var communityTopicCommentRequest = {
  search (param) {
    return post('/admin/CommunityTopicComment/Search', sf(param))
  },
  deleteComment (ids) {
    return post('/admin/CommunityTopicComment/DeleteComment', sf({ids}))
  },
  recoverComment (ids) {
    return post('/admin/CommunityTopicComment/RecoverComment', sf({ids}))
  }
}

var roleRequest = {
  powserList () {
    return post('/admin/Power/GetPowers')
  },
  deleteRole (ids) {
    return post('/admin/Power/DeleteRole', sf({ids}))
  },
  getRoles () {
    return post('/admin/Power/GetRoles')
  },
  modifyRole (id, powerIds, name) {
    return post('/admin/Power/ModifyRole', sf({id, powerIds, name}))
  },
  getAdminUser () {
    return post('/admin/Power/GetAdminUser')
  },
  removeAdminUser (ids) {
    return post('/admin/Power/RemoveAdminUser', sf({ids}))
  },
  saveUserRoles (id, roleIds) {
    return post('/admin/Power/saveUserRoles', sf({id, roleIds}))
  }
}
export {
  loginRequest,
  indexRequest,
  addPageRequest,
  memberManageRequest,
  messageManageRequest,
  communityManageRequest,
  communityTopicRequest,
  communityTopicCommentRequest,
  giftManageRequest,
  roleRequest
}

