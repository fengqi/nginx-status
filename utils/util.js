const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatHost = host => {
    if (!host) {
        return host;
    }

    var http = host.substr(0, 7).toLowerCase(),
        https = host.substr(0, 8).toLowerCase();

    console.log(http, https);

    if (http == "http://" || https == "https://") {
        return host;
    }

    return "http://" + host;
}

module.exports = {
  formatTime: formatTime,
  formatHost: formatHost
}
