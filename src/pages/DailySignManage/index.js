import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AMisRenderer } from '../../utils/AMisRenderer';
import { ApiGetConfig, APiSetConfig } from '../../utils/api';
/* eslint no-underscore-dangle: 0 */
/* eslint no-template-curly-in-string: 0 */

class DailySign extends Component {
  render() {
    const crudBody = {
      type: 'form',
      mode: 'horizontal',
      autoFocus: false,
      title: '',
      initApi: {
        url: ApiGetConfig,
        method: 'post',
        adaptor: payload => payload,
      },
      api: {
        url: APiSetConfig,
        method: 'post',
        data: {
          canCheckin: '${canCheckin | raw}',
          checkinNumber: '${checkinNumber | raw}',
          rewardAmount: '${rewardAmount | raw}',
        },
        // adaptor: payload => {
        //   return payload;
        // }
      },
      horizontal: {
        left: 'col-xs-4',
        right: 'col-xs-7',
      },
      controls: [
        {
          name: 'canCheckin',
          type: 'switch',
          label: '开关',
          option: '',
        },
        {
          type: 'group',
          label: '单日签到人数上限',
          required: true,
          controls: [
            {
              type: 'number',
              step: 1,
              name: 'checkinNumber',
              // "columnClassName": "col-xs-8",
              mode: 'inline',
              required: true,
            },
            {
              type: 'plain',
              text: '人',
              className: 'explain-txt',
            },
          ],
        },
        {
          type: 'group',
          label: '每个账户每次签到奖励',
          required: true,
          controls: [
            {
              type: 'number',
              step: 1,
              name: 'rewardAmount',
              mode: 'inline',
              required: true,
              precision: 2,
            },
            {
              type: 'plain',
              text: 'FC',
              className: 'explain-txt',
            },
          ],
        },
      ],
    };

    const schema = {
      title: '签到管理',
      body: [
        {
          type: 'wrapper',
          className: 'col-xs-10 col-md-8',
          body: crudBody,
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

export default connect()(DailySign);
