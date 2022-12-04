
function formatDuration(value: string) {
  var seconds = parseInt(value, 10);
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  var seconds = seconds - hours * 3600 - minutes * 60;
  if (!!hours) {
    if (!!minutes) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } 
    else {
      return `${hours}h ${seconds}s`;
    }
  }
  if (!!minutes) {
    if (!!seconds) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${minutes}m`;
    }
  }
  return `${seconds}s`;
}

function parseDuration(value: string) {
  let tokens = value.split(" ");
  let res = 0;
  for (let token of tokens) {
    if(token.endsWith('h')) {
      token = token.slice(0, -1)
      res += parseInt(token, 10) * 3600;
    }
    else if(token.endsWith('m')) {
      token = token.slice(0, -1)
      res += parseInt(token, 10) * 60;
    }
    else if(token.endsWith('s')) {
      token = token.slice(0, -1)
      res += parseInt(token, 10);
    }
  }
  return res
}

export {formatDuration, parseDuration}
