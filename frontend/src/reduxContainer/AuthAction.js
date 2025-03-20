export const login_sucess = 'login_sucess';
export const SET_ADMIN_STATUS = 'SET_ADMIN_STATUS';

export const loginSucess = (custID) =>{
    return {
        type: login_sucess,
        payload: custID
    }
}

export const setAdminStatus = (isAdmin) => {
    return {
      type: SET_ADMIN_STATUS,
      payload: isAdmin,
    };
  };