import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AMisRenderer } from '../../utils/AMisRenderer';
import { ApiAccountSearch } from '../../utils/api';
/* eslint no-underscore-dangle: 0 */

class UserSearch extends Component {
  render() {
    const crudBody = {
      type: 'crud',
      initFetch: true,
      syncLocation: false,
      perPageField: 'limit',
      headerToolbar: [],
      source: '$userListView',
      defaultParams: {
        limit: 5,
      },
      api: {
        url: ApiAccountSearch,
        method: 'post',
        data: {
          limit: '$limit',
          page: '$page',
          name: '$keywords',
        },
        adaptor: payload => ({
          status: payload.msg,
          msg: payload.status,
          data: {
            userListView: payload.data.list,
            total: payload.data.total,
          },
        }),
      },
      filter: {
        title: '用户账号或昵称',
        submitText: '',
        controls: [
          {
            type: 'text',
            name: 'keywords',
            placeholder: '通过关键字搜索',
            addOn: {
              label: '搜索',
              type: 'submit',
            },
          },
        ],
      },
      combineNum: 4,
      columns: [
        {
          name: 'email',
          label: '用户账号',
          type: 'text',
        },
        {
          name: 'nickname',
          label: '用户昵称',
          type: 'text',
        },
        {
          name: 'registeredAt',
          label: '注册时间',
          type: 'tpl',
          tpl: "<%= formatDate(data.registeredAt, 'YYYY-MM-DDTHH:mm:ss Z') %>",
        },
        {
          name: 'activateAt',
          label: '最近登录时间',
          type: 'tpl',
          tpl: "<%= formatDate(data.activateAt, 'YYYY-MM-DDTHH:mm:ss Z') %>",
        },
        {
          name: 'fansCoin',
          label: '账号FC余额',
          type: 'text',
        },
        {
          name: 'createdBountyNumber',
          label: '创建Bounty数量',
          type: 'text',
        },
        {
          name: 'claimedBountyNumber',
          label: '领取Bounty数量',
          type: 'text',
        },
        {
          name: 'submissionNumber',
          label: '提交方案数量',
          type: 'text',
        },
        {
          name: 'inviterAccount',
          label: '该用户上级申请人账号',
          type: 'text',
        },
        {
          name: 'invitationSuccessNumber',
          label: '邀请成功下级用户数量',
          type: 'text',
        },
      ],
    };

    const schema = {
      title: '邀请码使用统计',
      body: [crudBody],
    };

    return (
      <div>
        <AMisRenderer schema={schema} />
      </div>
    );
  }
}

export default connect()(UserSearch);
