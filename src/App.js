import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Layout, Button, AsideNav, ToastComponent, AlertComponent,
} from 'amis';
import {
  Route, Switch, BrowserRouter, Link, Redirect,
} from 'react-router-dom';

// components
import cx from 'classnames';
import { PageRouter, navCfg } from './route/router';
import NotFound from './pages/404';
import BountyLogo from './assets/images/logo-icon.png';
import HeadSelect from './components/HeadSelect';

// styles
import 'bootstrap/dist/css/bootstrap.css';
import 'amis/lib/themes/default.css';
import 'font-awesome/css/font-awesome.css';
import './globalStyles/base.less';
import './globalStyles/helper.less';
import './globalStyles/icons.less';

// import * as utils from './utils';
import * as constant from './constants';
import { reqCheckLogin } from './utils/api';

import Login from './pages/Login';

const PATH_PREFIX = '/admin';
function normalizeLink(path) {
  return path[0] === '/' ? path : `${PATH_PREFIX}/${path}`;
}
function isActive(link, location) {
  if (link) {
    if (location.pathname.indexOf(link) === 0) {
      return true;
    }
  }
  return false;
}

class App extends PureComponent {
  constructor(...args) {
    super(...args);
    const { dispatch } = this.props;
    this.updateLeft = (a) => {
      dispatch({
        type: constant.UPDATE_ASIDE,
        payload: a,
      });
    };
    reqCheckLogin().then(
      (body) => {
        if (body.code !== 0) {
          dispatch({
            type: constant.UPDATE_COMMON,
            payload: {
              userLoggedIn: false,
            },
          });
          return;
        }
        dispatch({
          type: constant.UPDATE_COMMON,
          payload: {
            userLoggedIn: true,
          },
        });
      },
      () => {
        dispatch({
          type: constant.UPDATE_COMMON,
          payload: {
            userLoggedIn: false,
          },
        });
      },
    );
  }

  toggleSettingIcon = () => {
    const { leftAside } = this.props;
    this.updateLeft({
      offScreen: !leftAside.offScreen,
    });
  };

  toggleLeftAside = () => {
    const { leftAside } = this.props;
    this.updateLeft({
      asideFolded: !leftAside.asideFolded,
    });
  };

  toggleUserDropDown = () => {
    const { leftAside } = this.props;
    this.updateLeft({
      userDropDownShow: !leftAside.userDropDownShow,
    });
  };

  renderAside(location) {
    const { leftAside } = this.props;

    return (
      <AsideNav
        key={leftAside.asideFolded ? 'folded-aside' : 'aside'}
        navigations={navCfg}
        renderLink={(param) => {
          const children = [];
          const { toggleExpand, link } = param;

          if (link.hide) {
            return null;
          }
          if (link.children && link.arrow !== false) {
            children.push(<span key="expand-toggle" className={cx('a-AsideNav-itemArrow')} />);
          }

          if (link.badge) {
            children.push(
              <b
                key="badge"
                className={cx('a-AsideNav-itemBadge', link.badgeClassName || 'bg-info')}
              >
                {link.badge}
              </b>,
            );
          }

          if (link.icon) {
            children.push(<i key="icon" className={cx('a-AsideNav-itemIcon', link.icon)} />);
          } else if (leftAside.asideFolded) {
            children.push(<i key="icon" className={cx('a-AsideNav-itemIcon', 'fa fa-file')} />);
          }

          children.push(
            <span className={cx('a-AsideNav-itemLabel')} key="label">
              {link.label}
            </span>,
          );

          return link.path ? (
            <Link to={normalizeLink(link.path)}>{children}</Link>
          ) : (
            <a onClick={link.children ? () => toggleExpand(link) : null}>{children}</a>
          );
        }}
        isActive={link => isActive(link.path && normalizeLink(link.path), location)}
      />
    );
  }

  renderHeader() {
    // const store = this.props.store;
    return (
      <div>
        <div className="a-Layout-brandBar">
          <button onClick={this.toggleSettingIcon} className="pull-right visible-xs">
            <i className="glyphicon glyphicon-align-justify" />
          </button>
          <div className="a-Layout-brand">
            <img src={BountyLogo} alt="bounty-logo" />
            <span className="hidden-folded m-l-sm" style={{ verticalAlign: 'middle' }}>
              Bounty Admin
            </span>
          </div>
        </div>
        <div className="a-Layout-headerBar">
          <div className="nav navbar-nav hidden-xs">
            <Button
              level="link"
              className="no-shadow navbar-btn"
              onClick={this.toggleLeftAside}
              tooltip="展开或收起侧边栏"
              placement="bottom"
              iconOnly
            >
              {/* <i className={false ? 'fa fa-indent' : 'fa fa-dedent'} /> */}
              <i className="fa fa-dedent" />
            </Button>
          </div>

          <div className="hidden-xs p-t-sm pull-right">
            {/* <UserIcon eventTypes="click" /> */}
            <HeadSelect />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { leftAside, userLoggedIn } = this.props;

    return (
      <BrowserRouter>
        <ToastComponent key="toast" position="top-right" />
        <AlertComponent key="alert" />

        <Switch>
          <Route path="/admin/login" exact component={Login} />
          <Route
            path="/admin"
            render={(arg) => {
              if (userLoggedIn === 'loading') {
                return null;
              }
              if (userLoggedIn === false) {
                return <Redirect to="/admin/login" />;
              }

              return (
                <Layout
                  aside={this.renderAside(arg.location)}
                  header={this.renderHeader(arg.location)}
                  folded={leftAside.asideFolded}
                  offScreen={leftAside.offScreen}
                >
                  <PageRouter />
                </Layout>
              );
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  leftAside: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    leftAside: state.leftAside,
    userLoggedIn: state.common.userLoggedIn,
  };
}
export default connect(mapStateToProps)(App);
