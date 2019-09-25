
const http = require('http');
const url = require('url');

const retBase = {
  code: 0,
  result: {},
  message: '',
};
function resp(res, data) {
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);

  console.log(parsed);

  if (parsed.pathname === '/admin/api/login') {
    if (parsed.query.userName === 'admin' && parsed.query.password === 'admin') {
      res.setHeader('asdas', 'asdsd');
      res.setHeader('Set-Cookie', 'sessionid=123123; HttpOnly; Path=/');

      resp(res, {
        ...retBase,
        result: {
          uid: 11,
          userName: 'admin',
        },
      });
    } else {
      resp(res, {
        ...retBase,
        code: 1,
        message: 'password incorrect',
      });
    }
  } else if (parsed.pathname === '/admin/api/login/check') {
    console.log(req.headers.cookie);

    if (req.headers.cookie.indexOf('sessionid') === -1) {
      resp(res, {
        ...retBase,
        code: 1,
        message: 'password incorrect',
      });
    } else {
      resp(res, {
        ...retBase,
      });
    }
  }
});

server.listen(7001);
