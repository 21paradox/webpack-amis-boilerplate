import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { AMisRenderer } from '../../utils/AMisRenderer';
import { ApiLogin } from '../../utils/api';
import { compose, i18nTxt } from '../../utils';
import * as constant from '../../constants';

const Wrapper = styled.div`
  margin: 7% auto;
  h1 {
    margin-bottom: 20px;
  }
  .login-wrapper {
    max-width: 400px;
    margin: auto;
  }
`;
const Back = styled.div`
  background-color: #d2d6de
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

class Login extends Component {
  render() {
    console.log(this.props);
    const formCfg = {
      type: 'form',
      mode: 'normal',
      autoFocus: true,
      title: '登录',
      api: {
        url: ApiLogin,
        method: 'get',
        data: {
          userName: '${userName | raw}',
          password: '${password | raw}',
        },
        adaptor: (payload) => {
          console.log({ payload });
          const { dispatch, history } = this.props;
          dispatch({
            type: constant.UPDATE_COMMON,
            payload: {
              userLoggedIn: true,
            },
          });
          setTimeout(() => {
            history.push(`${constant.publicPath}/`);
          });
          return payload;
        },
      },
      // redirect: 'http://baidu.com',
      messages: {
        saveSuccess: '登录成功',
      },
      controls: [
        {
          type: 'text',
          name: 'userName',
          required: true,
          placeholder: '请输入用户名',
          label: '邮箱',
          size: 'full',
        },
        {
          type: 'password',
          name: 'password',
          label: '密码',
          required: true,
          placeholder: '请输入密码',
          size: 'full',
        },
        {
          type: 'checkbox',
          name: 'rememberMe',
          label: '记住登录',
        },
        {
          type: 'submit',
          btnClassName: 'btn-default',
          label: '登录',
        },
      ],
    };

    const schema = {
      title: '',
      body: [
        {
          children(props) {
            return (
              <div className="container">
                <Wrapper>
                  <h1 className="text-center">
Admin
                    {i18nTxt('System Manage')}
                  </h1>
                  <div className="login-wrapper">{props.render('body', formCfg, {})}</div>
                </Wrapper>
                <Back />
              </div>
            );
          },
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

const enhance = compose(
  withRouter,
  connect(),
);

export default enhance(Login);
