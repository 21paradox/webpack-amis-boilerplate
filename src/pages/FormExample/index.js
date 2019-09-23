import React, { Component } from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import get from 'lodash/get';
import moment from 'moment';
import styled from 'styled-components';
import { AMisRenderer } from '../../utils/AMisRenderer';
import { ApiAdminStat } from '../../utils/api';

const now = moment();

const DownLoadWrapper = styled.div`
  position: relative;
  .btn-default {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
  }
`;

class FormExample extends Component {
  render() {
    const userQuery = [
      {
        $group: {
          _id: null,
          level0: {
            $sum: {
              $cond: {
                if: { $eq: ['\\$level', 0] },
                then: 1,
                else: 0,
              },
            },
          },
          level1: {
            $sum: {
              $cond: {
                if: { $eq: ['\\$level', 1] },
                then: 1,
                else: 0,
              },
            },
          },
          level2: {
            $sum: {
              $cond: {
                if: { $eq: ['\\$level', 2] },
                then: 1,
                else: 0,
              },
            },
          },
          level: {
            $sum: 1,
          },
        },
      },
    ];

    const timeCond = (timeCount, name = '\\$lastActiveAt') => ({
      $sum: {
        $cond: {
          if: {
            $gt: [
              name,
              {
                $dateFromString: {
                  dateString: now
                    .clone()
                    .subtract(timeCount, 'day')
                    .startOf('day')
                    .toISOString(),
                },
              },
            ],
          },
          then: 1,
          else: 0,
        },
      },
    });
    const userLogQuery = matchType => [
      { $match: { action: matchType } },
      {
        $group: {
          _id: '\\$userId',
          lastActiveAt: {
            $last: '\\$createdAt',
          },
        },
      },
      {
        $group: {
          _id: null,
          '1d': timeCond(1),
          '7d': timeCond(7),
          '30d': timeCond(30),
          '90d': timeCond(90),
          all: {
            $sum: 1,
          },
        },
      },
    ];

    const createdBountyQuery = [
      {
        $group: {
          _id: null,
          '1d': timeCond(1, '\\$createdAt'),
          '7d': timeCond(7, '\\$createdAt'),
          '30d': timeCond(30, '\\$createdAt'),
          '90d': timeCond(90, '\\$createdAt'),
          all: {
            $sum: 1,
          },
        },
      },
    ];

    const createdSubmissionQuery = [
      {
        $group: {
          _id: null,
          '1d': timeCond(1, '\\$createdAt'),
          '7d': timeCond(7, '\\$createdAt'),
          '30d': timeCond(30, '\\$createdAt'),
          '90d': timeCond(90, '\\$createdAt'),
          all: {
            $sum: 1,
          },
        },
      },
    ];

    const likeBountyQuery = [
      { $match: { belongType: 'Submission' } },
      {
        $group: {
          _id: null,
          '1d': timeCond(1, '\\$createdAt'),
          '7d': timeCond(7, '\\$createdAt'),
          '30d': timeCond(30, '\\$createdAt'),
          '90d': timeCond(90, '\\$createdAt'),
          all: {
            $sum: 1,
          },
        },
      },
    ];
    const commentQuery = [
      {
        $group: {
          _id: null,
          '1d': timeCond(1, '\\$createdAt'),
          '7d': timeCond(7, '\\$createdAt'),
          '30d': timeCond(30, '\\$createdAt'),
          '90d': timeCond(90, '\\$createdAt'),
          all: {
            $sum: 1,
          },
        },
      },
    ];

    const withdrawRequestQuery = [
      { $match: { status: 'AUDITING' } },
      {
        $group: {
          _id: null,
          '1d': timeCond(1, '\\$createdAt'),
          '7d': timeCond(7, '\\$createdAt'),
          '30d': timeCond(30, '\\$createdAt'),
          '90d': timeCond(90, '\\$createdAt'),
          all: {
            $sum: 1,
          },
        },
      },
    ];

    const timeCondReward = (timeCount, name) => ({
      $sum: {
        $cond: {
          if: {
            $gt: [
              name,
              {
                $dateFromString: {
                  dateString: now
                    .clone()
                    .subtract(timeCount, 'day')
                    .startOf('day')
                    .toISOString(),
                },
              },
            ],
          },
          then: '\\$fansCoin',
          else: 0,
        },
      },
    });
    const rewardQuery = [
      {
        $group: {
          _id: null,
          '1d': timeCondReward(1, '\\$createdAt'),
          '7d': timeCondReward(7, '\\$createdAt'),
          '30d': timeCondReward(30, '\\$createdAt'),
          '90d': timeCondReward(90, '\\$createdAt'),
          all: {
            $sum: '\\$fansCoin',
          },
        },
      },
    ];

    const withdrawSuccessQuery = [
      { $match: { status: 'FINISHED' } },
      {
        $group: {
          _id: null,
          '1d': timeCond(1, '\\$createdAt'),
          '7d': timeCond(7, '\\$createdAt'),
          '30d': timeCond(30, '\\$createdAt'),
          '90d': timeCond(90, '\\$createdAt'),
          all: {
            $sum: 1,
          },
        },
      },
    ];

    const timeCondCost = (timeCount, name) => ({
      $sum: {
        $cond: {
          if: {
            $gt: [
              name,
              {
                $dateFromString: {
                  dateString: now
                    .clone()
                    .subtract(timeCount, 'day')
                    .startOf('day')
                    .toISOString(),
                },
              },
            ],
          },
          then: '\\$costFansCoin',
          else: 0,
        },
      },
    });
    const costFansCoinQuery = [
      {
        $group: {
          _id: null,
          '1d': timeCondCost(1, '\\$createdAt'),
          '7d': timeCondCost(7, '\\$createdAt'),
          '30d': timeCondCost(30, '\\$createdAt'),
          '90d': timeCondCost(90, '\\$createdAt'),
          all: {
            $sum: '\\$costFansCoin',
          },
        },
      },
    ];

    const schema = {
      type: 'page',

      body: [
        {
          type: 'service',
          api: {
            url: ApiAdminStat,
            method: 'post',
            data: {
              modelName: 'User',
              param: userQuery,
            },
          },
          body: {
            children(props) {
              const { queryResult } = props.data;
              return (
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">账号</h3>
                  </div>
                  <div className="panel-body">
                    <dl className="dl-horizontal">
                      <dt>注册账号总数</dt>
                      <dd>{get(queryResult, [0, 'level'])}</dd>
                      <dt>一级账号总数</dt>
                      <dd>{get(queryResult, [0, 'level0'])}</dd>
                      <dt>二级账号总数</dt>
                      <dd>{get(queryResult, [0, 'level1'])}</dd>
                      <dt>三级账号总数</dt>
                      <dd>{get(queryResult, [0, 'level2'])}</dd>
                    </dl>
                  </div>
                </div>
              );
            },
          },
        },
        {
          type: 'service',
          api: {
            url: [
              ApiAdminStat,
              ApiAdminStat,
              ApiAdminStat,
              ApiAdminStat,
              ApiAdminStat,
              ApiAdminStat,
              ApiAdminStat,
              ApiAdminStat,
              ApiAdminStat,
              ApiAdminStat,
            ],
            method: 'post',
            data: [
              {
                modelName: 'UserActionLog',
                param: userLogQuery('SIGNUP'),
              },
              {
                modelName: 'UserActionLog',
                param: userLogQuery('LOGIN'),
              },
              {
                modelName: 'Bounty',
                param: createdBountyQuery,
              },
              {
                modelName: 'Submission',
                param: createdSubmissionQuery,
              },
              {
                modelName: 'Like',
                param: likeBountyQuery,
              },
              {
                modelName: 'Comment',
                param: commentQuery,
              },
              {
                modelName: 'Withdrawal',
                param: withdrawRequestQuery,
              },
              {
                modelName: 'Reward',
                param: rewardQuery,
              },
              {
                modelName: 'Withdrawal',
                param: withdrawSuccessQuery,
              },
              {
                modelName: 'Order',
                param: costFansCoinQuery,
              },
            ],
            adaptor: (payload) => {
              const retArr = payload.data;
              const dataPased = [
                {
                  label: '当天实时',
                  loginCount: get(retArr, [0, 'queryResult', 0, '1d']),
                  signUpCount: get(retArr, [1, 'queryResult', 0, '1d']),
                  bountyCreatedCount: get(retArr, [2, 'queryResult', 0, '1d']),
                  submissionCreatedCount: get(retArr, [3, 'queryResult', 0, '1d']),
                  likeBountyCount: get(retArr, [4, 'queryResult', 0, '1d']),
                  commentCount: get(retArr, [5, 'queryResult', 0, '1d']),
                  withDrawRequestCount: get(retArr, [6, 'queryResult', 0, '1d']),
                  rewardSum: get(retArr, [7, 'queryResult', 0, '1d']),
                  withDrawSuccessCount: get(retArr, [8, 'queryResult', 0, '1d']),
                  costFcSum: get(retArr, [9, 'queryResult', 0, '1d']),
                },
                {
                  label: '最近7天',
                  loginCount: get(retArr, [0, 'queryResult', 0, '7d']),
                  signUpCount: get(retArr, [1, 'queryResult', 0, '7d']),
                  bountyCreatedCount: get(retArr, [2, 'queryResult', 0, '7d']),
                  submissionCreatedCount: get(retArr, [3, 'queryResult', 0, '7d']),
                  likeBountyCount: get(retArr, [4, 'queryResult', 0, '7d']),
                  commentCount: get(retArr, [5, 'queryResult', 0, '7d']),
                  withDrawRequestCount: get(retArr, [6, 'queryResult', 0, '7d']),
                  rewardSum: get(retArr, [7, 'queryResult', 0, '7d']),
                  withDrawSuccessCount: get(retArr, [8, 'queryResult', 0, '7d']),
                  costFcSum: get(retArr, [9, 'queryResult', 0, '7d']),
                },
                {
                  label: '最近30天',
                  loginCount: get(retArr, [0, 'queryResult', 0, '30d']),
                  signUpCount: get(retArr, [1, 'queryResult', 0, '30d']),
                  bountyCreatedCount: get(retArr, [2, 'queryResult', 0, '30d']),
                  submissionCreatedCount: get(retArr, [3, 'queryResult', 0, '30d']),
                  likeBountyCount: get(retArr, [4, 'queryResult', 0, '30d']),
                  commentCount: get(retArr, [5, 'queryResult', 0, '30d']),
                  withDrawRequestCount: get(retArr, [6, 'queryResult', 0, '30d']),
                  rewardSum: get(retArr, [7, 'queryResult', 0, '30d']),
                  withDrawSuccessCount: get(retArr, [8, 'queryResult', 0, '30d']),
                  costFcSum: get(retArr, [9, 'queryResult', 0, '30d']),
                },
                {
                  label: '最近90天',
                  loginCount: get(retArr, [0, 'queryResult', 0, '90d']),
                  signUpCount: get(retArr, [1, 'queryResult', 0, '90d']),
                  bountyCreatedCount: get(retArr, [2, 'queryResult', 0, '90d']),
                  submissionCreatedCount: get(retArr, [3, 'queryResult', 0, '90d']),
                  likeBountyCount: get(retArr, [4, 'queryResult', 0, '90d']),
                  commentCount: get(retArr, [5, 'queryResult', 0, '90d']),
                  withDrawRequestCount: get(retArr, [6, 'queryResult', 0, '90d']),
                  rewardSum: get(retArr, [7, 'queryResult', 0, '90d']),
                  withDrawSuccessCount: get(retArr, [8, 'queryResult', 0, '90d']),
                  costFcSum: get(retArr, [9, 'queryResult', 0, '90d']),
                },
                {
                  label: '全部历史',
                  loginCount: get(retArr, [0, 'queryResult', 0, 'all']),
                  signUpCount: get(retArr, [1, 'queryResult', 0, 'all']),
                  bountyCreatedCount: get(retArr, [2, 'queryResult', 0, 'all']),
                  submissionCreatedCount: get(retArr, [3, 'queryResult', 0, 'all']),
                  likeBountyCount: get(retArr, [4, 'queryResult', 0, 'all']),
                  commentCount: get(retArr, [5, 'queryResult', 0, 'all']),
                  withDrawRequestCount: get(retArr, [6, 'queryResult', 0, 'all']),
                  rewardSum: get(retArr, [7, 'queryResult', 0, 'all']),
                  withDrawSuccessCount: get(retArr, [8, 'queryResult', 0, 'all']),
                  costFcSum: get(retArr, [9, 'queryResult', 0, 'all']),
                },
              ];
              return {
                ...payload,
                data: {
                  retArr,
                  dataPased,
                },
              };
            },
          },

          body: [
            {
              children() {
                return (
                  <DownLoadWrapper>
                    <button className="btn btn-default" type="submit">
                      导出excel
                    </button>
                  </DownLoadWrapper>
                );
              },
            },
            {
              type: 'table',
              title: '统计表格',
              source: '$dataPased',
              columns: [
                {
                  name: 'label',
                  label: '',
                },
                {
                  name: 'loginCount',
                  label: '登录账号数',
                },
                {
                  name: 'signUpCount',
                  label: '注册账号数',
                },
                {
                  name: 'bountyCreatedCount',
                  label: '创建bounty数量',
                },
                {
                  name: 'submissionCreatedCount',
                  label: '提交方案数量',
                },
                {
                  name: 'likeBountyCount',
                  label: 'Bounty收藏数量',
                },
                {
                  name: 'commentCount',
                  label: 'Bounty留言数量',
                },
                {
                  name: 'withDrawRequestCount',
                  label: '申请提现数量',
                },
                {
                  name: 'rewardSum',
                  label: '奖励FC总数',
                },
                {
                  name: 'withDrawSuccessCount',
                  label: '提现FC总数',
                },
                {
                  name: 'costFcSum',
                  label: '消费FC总数',
                },
              ],
            },
          ],
        },
      ],
    };

    return (
      <div>
        <AMisRenderer schema={schema} />
      </div>
    );
  }
}

export default FormExample;
