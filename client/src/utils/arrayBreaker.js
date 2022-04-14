function arrayBreaker(files, size) {
  const bigArray = [];
  while (files.length) {
    var mini = files.splice(0, size);
    bigArray.push(mini);
  }
  return bigArray;
}

export default arrayBreaker;
