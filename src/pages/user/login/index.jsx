import { Alert, Checkbox, Icon, Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.less';

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  render() {
    const { autoLogin } = this.state;
    const code = this.props.location.query.code;
    if (typeof code != 'undefined') {
      return (
        <div className={styles.main} style={{ textAlign: 'center' }}>
          <Spin tip={'登录中'}/>
        </div>
      );
    } else {
      return (
        <div className={styles.main}>
          <div id={'login_container'} style={{ textAlign: 'center' }}/>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
          </div>
        </div>
      );
    }

  }

  componentDidMount() {
    const code = this.props.location.query.code;
    const { type } = this.state;
    // 当URL中包含code参数时，说明是扫过码之后跳转回来的
    // 因此页面显示登录中，使用code请求后端接口
    if (typeof code != 'undefined') {
      console.log('state: ', this.state, 'props: ', this.props);
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          code,
          type
        }
      });
    }
    // 当URL中不包含code参数时渲染二维码
    if (typeof code == 'undefined' && typeof window.DDLogin != 'undefined') {
      const appid = 'dingoapdvhpjlrjr2to8ay';
      let url = encodeURIComponent(window.location.href);
      let goto = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid='
        + appid
        + '&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + url)

      let obj = DDLogin({
        id: 'login_container',
        goto: goto,
        width: '300',
        height: '300'
      });
      const handleMessage = function (event) {
        const origin = event.origin;
        if (origin === 'https://login.dingtalk.com') { //判断是否来自ddLogin扫码事件。
          const loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          window.location.href = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid='
            + appid
            + '&response_type=code&scope=snsapi_login&state=STATE&redirect_uri='
            + url
            + '&loginTmpCode=' + loginTmpCode;
        }
      };
      if (typeof window.addEventListener != 'undefined') {
        window.addEventListener('message', handleMessage, false);
      } else if (typeof window.attachEvent != 'undefined') {
        window.attachEvent('onmessage', handleMessage);
      }
    }
  }
}

export default Login;
