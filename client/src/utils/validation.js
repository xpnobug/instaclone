export const validateEmail = (email) => {
  if (
    !email ||
    !email.match(
      //eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return '请输入有效的电子邮件地址.';
  }
  return false;
};

export const validateFullName = (fullName) => {
  if (!fullName) {
    return '请输入名称.';
  }
  return false;
};

export const validateUsername = (username) => {
  if (!username) {
    return '请输入符合要求的用户名.';
  } else if (username.length > 30 || username.length < 3) {
    return '请选择3到30个字符之间的登录名.';
    //eslint-disable-next-line
  } else if (!username.match(/^[a-zA-Z0-9\_.]+$/)) {
    return 'A username can only contain the following: letters A-Z, numbers 0-9 and the symbols _ . ';
  }
  return false;
};

export const validatePassword = (password) => {
  if (!password) {
    return '请输入正确的密码.';
  } else if (password.length < 6) {
    return '出于安全考虑，要求密码至少有6个字符';
  } else if (
    !password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/)
  ) {
    return '密码至少包含一个大写字母、一个小写字母、一个特殊字符和一个数字.';
  }
  return false;
};

export const validateBio = (bio) => {
  if (bio.length > 130) {
    return 'Your bio has to be 120 characters or less.';
  }
  return false;
};

export const validateWebsite = (website) => {
  if (
    website &&
    !website.match(
      //eslint-disable-next-line
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    )
  ) {
    return 'Please provide a valid website.';
  }
  return false;
};
