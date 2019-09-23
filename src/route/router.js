import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { mapTree } from 'amis/lib/utils/helper';

const navCfg = [
  {
    label: '导航',
    children: [
      // {
      //   path: 'dashboard',
      //   label: 'Dashboard',
      //   icon: 'glyphicon glyphicon-signal',
      //   component: lazy(() => import('../pages/Basic')),
      // },
      // {
      //   label: '表单页面',
      //   icon: 'glyphicon glyphicon-btc',
      //   children: [
      //     {
      //       label: '常规表单',
      //       path: 'form/basic',
      //       component: lazy(() => import('../pages/FormExample')),
      //     },
      //   ],
      // },
      {
        label: '邀请码管理',
        icon: 'glyphicon glyphicon-link',
        children: [
          {
            label: '邀请码扩容',
            path: 'invite-code-manage',
            component: lazy(() => import('../pages/InviteCodeManage/invitation')),
          },
        ],
      },

      {
        label: '签到管理',
        icon: 'glyphicon glyphicon-link',
        children: [
          {
            label: '签到设置',
            path: 'daily-signin',
            component: lazy(() => import('../pages/DailySignManage/index')),
          },
        ],
      },

      {
        label: '运营dashboard',
        icon: 'glyphicon glyphicon-list-alt',
        children: [
          {
            label: '邀请码使用统计',
            path: 'invitecode-dashboard',
            component: lazy(() => import('../pages/InviteCodeManage/dashboard')),
          },
          {
            label: '用户信息查询',
            path: 'userSearch',
            component: lazy(() => import('../pages/Dashboard/userSearch')),
          },
        ],
      },
    ],
  },
];

const PATH_PREFIX = '/admin';

function navigations2route(pathPrefix = PATH_PREFIX) {
  const routes = [];

  navCfg.forEach((root) => {
    if (root.children) {
      mapTree(root.children, (item) => {
        if (item.path && item.component) {
          routes.push(
            <Route
              key={routes.length + 1}
              path={item.path[0] === '/' ? item.path : `${pathPrefix}/${item.path}`}
              component={item.component}
              exact
            />,
          );
        }
      });
    }
  });

  return routes;
}

function PageRouter() {
  return (
    <Suspense fallback={<div className="ui active loader" />}>
      <Switch>{navigations2route()}</Switch>
    </Suspense>
  );
}
export { PageRouter, navCfg };
