import React, { Component } from 'react';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AMisRenderer } from '../../utils/AMisRenderer';
import {
  ApiGoodsCreate, ApiGoodsList, ApiGoodsUpdate, ApiGoodsdelete,
} from '../../utils/api';
import * as utils from '../../utils';

/* eslint no-template-curly-in-string: 0 */
class Invitation extends Component {
  render() {
    const editDialog = {
      title: '新增扩容包',
      body: {
        type: 'form',
        name: 'form-add-invitation',
        mode: 'horizontal',
        autoFocus: false,
        horizontal: {
          left: 'col-sm-5',
          right: 'col-sm-6',
        },
        controls: [
          {
            type: 'text',
            name: 'name',
            label: '名称',
            required: true,
            size: 'full',
          },
          {
            type: 'text',
            name: 'title',
            label: '描述',
            required: true,
            size: 'full',
          },
          {
            type: 'group',
            label: '单个扩容包价格',
            required: true,
            controls: [
              {
                type: 'number',
                step: 1,
                name: 'fansCoin',
                // "columnClassName": "col-xs-8",
                mode: 'inline',
                required: true,
              },
              {
                type: 'plain',
                text: 'FC',
                className: 'explain-txt',
              },
            ],
          },
          {
            type: 'group',
            label: '单个用户购买扩容包上限',
            required: true,
            controls: [
              {
                type: 'number',
                step: 1,
                name: 'restrictNumber',
                mode: 'inline',
                required: true,
              },
              {
                type: 'plain',
                text: '个',
                className: 'explain-txt',
              },
            ],
          },
          {
            type: 'group',
            label: '总扩容包',
            required: true,
            controls: [
              {
                type: 'number',
                step: 1,
                name: 'number',
                mode: 'inline',
                required: true,
              },
              {
                type: 'plain',
                text: '个',
                className: 'explain-txt',
              },
            ],
          },
          {
            type: 'group',
            label: '单个扩容包含邀请码',
            required: true,
            controls: [
              {
                type: 'number',
                step: 1,
                name: 'codeNumber',
                mode: 'inline',
                required: true,
              },
              {
                type: 'plain',
                text: '个',
                className: 'explain-txt',
              },
            ],
          },
        ],
      },
      data: {},
      actions: [
        {
          type: 'button',
          actionType: 'cancel',
          close: true,
          level: 'secondary',
          label: '取消',
        },
        {
          type: 'submit',
          reload: 'cInviteList',
          level: 'danger',
          actionType: 'ajax',
          label: '确定',
          api: {
            url: ApiGoodsCreate,
            method: 'post',
            data: {
              type: 'INVITATION_CODE',
              name: '$name',
              title: '$title',
              number: '${number | raw}',
              fansCoin: '${fansCoin | raw}',
              codeNumber: '${codeNumber | raw}',
              restrictNumber: '${restrictNumber | raw}',
              // all: '$$',
            },
          },
          messages: {
            success: '保存成功',
          },
          close: true,
        },
      ],
    };

    const addButton = {
      type: 'wrapper',
      className: 'col-xs-10',
      body: {
        type: 'button',
        actionType: 'dialog',
        label: '新增扩容包',
        icon: 'fa fa-plus pull-left',
        primary: true,
        dialog: editDialog,
      },
    };

    const bodyCrud = {
      name: 'cInviteList',
      className: 'col-xs-10',
      type: 'crud',
      mode: 'list',
      api: {
        url: ApiGoodsList,
        method: 'post',
        data: {
          type: 'INVITATION_CODE',
          limit: '$limit',
          page: '$page',
          // status: 'VALID'
        },
      },
      syncLocation: false,
      perPageField: 'limit',
      defaultParams: {
        limit: 5,
      },
      filterTogglable: false,
      // "labelTpl": "${id} ${engine}",
      headerToolbar: [],

      listItem: {
        actions: [
          {
            type: 'button',
            icon: 'fa fa-pencil',
            actionType: 'dialog',
            dialog: {
              title: '编辑扩容包',
              body: {
                ...editDialog.body,
                name: 'form-edit-invitation',
                controls: utils.renderAny(() => [
                  {
                    name: 'status',
                    type: 'switch',
                    label: '开关状态',
                    option: '',
                    trueValue: 'VALID',
                    falseValue: 'INVALID',
                  },
                ].concat(editDialog.body.controls)),
              },
              actions: [
                {
                  type: 'button',
                  actionType: 'cancel',
                  close: true,
                  level: 'secondary',
                  label: '取消',
                },
                {
                  type: 'button',
                  reload: 'cInviteList',
                  level: 'danger',
                  actionType: 'ajax',
                  label: '确定',
                  api: {
                    url: ApiGoodsUpdate,
                    method: 'post',
                    data: {
                      type: 'INVITATION_CODE',
                      goodsId: '$id',
                      name: '$name',
                      title: '$title',
                      number: '${number | raw}',
                      fansCoin: '${fansCoin | raw}',
                      restrictNumber: '${restrictNumber | raw}',
                      codeNumber: '${codeNumber | raw}',
                      status: '${status | raw}',
                    },
                  },
                  messages: {
                    success: '保存成功',
                  },
                  close: true,
                },
              ],
            },
          },
          {
            type: 'button',
            icon: 'fa fa-times text-danger',
            actionType: 'dialog',
            dialog: {
              title: '弹框',
              body: '确定删除 ${name} 吗？',
              actions: [
                {
                  type: 'button',
                  actionType: 'cancel',
                  close: true,
                  level: 'secondary',
                  label: '取消',
                },
                {
                  type: 'button',
                  reload: 'cInviteList',
                  level: 'danger',
                  actionType: 'ajax',
                  label: '确定',
                  api: {
                    url: ApiGoodsdelete,
                    method: 'post',
                    data: {
                      goodsId: '$id',
                    },
                  },
                  messages: {
                    success: '删除成功',
                  },
                  close: true,
                },
              ],
            },
          },
        ],
        body: [
          {
            name: 'name',
            label: '名称',
          },
          {
            name: 'title',
            label: '描述',
          },
          {
            type: 'mapping',
            name: 'status',
            label: '开关',
            map: {
              VALID: "<span class='label label-info'>开</span>",
              DELETED: "<span class='label label-default'>已删除</span>",
              '*': "<span class='label label-default'>关</span>",
            },
          },
          {
            name: 'fansCoin',
            label: '单个扩容包价格(FC)',
          },
          {
            name: 'restrictNumber',
            label: '单个用户购买扩容包上限',
          },
          {
            name: 'number',
            label: '总扩容包',
          },
          {
            name: 'codeNumber',
            label: '单个扩容包含邀请码',
          },
        ],
        // title: '$name',
        // subTitle: 'subTitle asdad',
        // desc: 'descjndkadnakd',
      },
    };

    const schema = {
      $schema: 'https://houtai.baidu.com/v2/schemas/page.json#',
      title: '邀请码扩容包',
      // "remark": "bla bla bla",
      body: [addButton, bodyCrud],
    };

    return (
      <div>
        <AMisRenderer schema={schema} />
      </div>
    );
  }
}

export default Invitation;
