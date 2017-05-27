import axios from 'axios'
import qs from 'qs'

const sf = qs.stringify
const post = axios.post

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
  }
}

export {
  addPageRequest,
  memberManageRequest,
  messageManageRequest,
  communityManageRequest
}

