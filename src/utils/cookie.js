function saveAuthToCookie(value) { // 토큰 값을 쿠키에 셋팅
    console.log(value)
    document.cookie = `auth=${value}; domain=localhost; path=/;`;
  }
  
  function saveUserToCookie(value) { // id 값을 쿠키에 싯팅
    document.cookie = `user=${value}; domain=localhost; path=/;`;
  }
  
  function getAuthFromCookie() { // 저장된 토큰값 가져오기
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
  }
  
  function getUserFromCookie() { // 저장된 유저값 가져오기
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
  }
  
  function deleteCookie(value) {
    console.log('쿠키삭제한다')
    document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=localhost; path=/;`;
  }
  
  export {
    saveAuthToCookie,
    saveUserToCookie,
    getAuthFromCookie,
    getUserFromCookie,
    deleteCookie,
  };