const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("authUser"));
  return user;
}

const removeUser = () => {
  localStorage.removeItem("authUser");
}

export {
  getLocalAccessToken,
  removeUser
}