function clone(obj) {
  var result;
  var type = objType(obj);
  if (type == "object") {
    result = {};
  } else if (type == "array") {
    result = [];
  } else {
    return obj;
  }

  for (var key in obj) {
    var copy = obj[key];
    if (objType(copy) == "object") {
      result[key] = clone(copy);
    } else if (objType(copy) == "array") {
      result[key] = clone(copy);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
}

function objType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export default {
  clone,
}