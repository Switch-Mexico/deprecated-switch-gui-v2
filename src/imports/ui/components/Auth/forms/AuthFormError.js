export default class AuthError {
  checkError(obj) {
    let errorMessage = '';
    if (!_.isNull(obj)) {
      if (!_.isUndefined(obj.error)) {
        if (!_.isUndefined(obj.error.error)) {
          errorMessage = obj.error.error;
        } else {
          errorMessage = obj.error;
        }
      } else {
        errorMessage = obj;
      }
      if (errorMessage !== '') {
        if (!_.isUndefined(errorMessage.message)) {
          console.log(errorMessage.message);
        } else {
          console.log(errorMessage);
        }
      }
    }
  }
}
