import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AMisRenderer } from '../../utils/AMisRenderer';
import * as actions from './actions';
/* eslint no-underscore-dangle: 0 */

class InviteCodeDashboard extends Component {
  render() {
    const crudBody = {
      type: 'crud',
      initFetch: true,
      syncLocation: false,
      perPageField: 'limit',
      headerToolbar: [],
      source: '$inviteeListView',
      defaultParams: {
        limit: actions.limitNum,
      },
      api: {
        url: actions.getInvitaionStat,
        method: 'post',
        data: {
          limit: '$limit',
          page: '$page',
          keywords: '$keywords',
          timeRange: '$timeRange',
        },
        adaptor: payload => ({
          ...payload,
        }),
      },
      filter: {
        title: '用户账号或昵称',
        submitText: '',
        controls: [
          {
            type: 'text',
            name: 'keywords',
            placeholder: '通过关键字查询',
            addOn: {
              label: '查询',
              type: 'submit',
            },
          },
          {
            type: 'date-range',
            minDate: '-1year',
            maxDate: '+0days',
            name: 'timeRange',
            label: '',
            submitOnChange: true,
          },
          {
            children() {
              return <span style={{ marginLeft: 20 }} />;
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
          name: 'nicknameInvitor',
          label: '用户昵称',
          type: 'text',
        },
        {
          name: 'invitationCountV1',
          label: '邀请码剩余次数',
          type: 'text',
        },
        {
          name: 'invitationCode',
          label: '邀请码',
          type: 'text',
        },
        {
          name: 'createdAt',
          label: '邀请码使用时间',
          type: 'text',
        },
        {
          name: 'emailInvitee',
          label: '邀请码使用者账号',
          type: 'text',
        },
        {
          name: 'nicknameInvitee',
          label: '邀请码使用者昵称',
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

export default connect()(InviteCodeDashboard);
