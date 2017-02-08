function sort(array, sortBy) {
  sortBy = sortBy || 'desc';
  if (array.length == 0) return [];

  var left = [];
  var right = []
  var pivot = array[0];

  if (sortBy === 'asc') {
    for (var i = 1; i < array.length; i++) {
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
  } else {
    for (var i = 1; i < array.length; i++) {
      array[i] > pivot ? left.push(array[i]) : right.push(array[i]);
    }
  }
  return sort(left, sortBy).concat(pivot, sort(right, sortBy));
}


function sortObj(array, key, sortBy) {
  key = key || 'id';
  sortBy = sortBy || 'desc';
  if (array.length == 0) return [];

  var left = [];
  var right = [];
  var pivot = array[0][key];
  var pivotObj = array[0];

  if (sortBy === 'asc') {
    for (var i = 1; i < array.length; i++) {
      array[i][key] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
  } else {
    for (var i = 1; i < array.length; i++) {
      array[i][key] > pivot ? left.push(array[i]) : right.push(array[i]);
    }
  }
  return sortObj(left, key, sortBy).concat(pivotObj, sortObj(right, key, sortBy));
}