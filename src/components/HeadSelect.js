import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AMisRenderer } from '../utils/AMisRenderer';

class HeadSelect extends Component {
  render() {
    const schema = {
      // api: {
      //   url: actions.getInvitaionStat,
      //   method: 'post',
      //   data: {
      //     limit: '$limit',
      //     page: '$page',
      //     keywords: '$keywords',
      //     timeRange: '$timeRange',
      //   },
      //   adaptor: payload => {
      //     return {
      //       ...payload,
      //     };
      //   },
      // },
      data: {
        email: 'adasdad',
        headOperation: 'a',
      },

      type: 'form',
      api: 'https://houtai.baidu.com/api/mock2/form/saveForm?waitSeconds=2',
      title: '',
      mode: 'inline',
      wrapWithPanel: false,
      autoFocus: false,
      controls: [
        {
          type: 'email',
          name: 'email',
          placeholder: 'Enter Email',
          label: '邮箱',
          size: 'auto',
        },
        // {
        //     "type": "button",
        //     "label": "导出",
        //     "url": "http://www.baidu.com/",
        // },
        {
          type: 'select',
          name: 'headOperation',
          label: '操作',
          placeholder: '操作',
          options: [
            {
              label: 'Option A',
              value: 'a',
            },
            {
              label: 'Option B',
              value: 'b',
            },
          ],
          submitOnChange: true,
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

export default connect()(HeadSelect);
