function UserInputError(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
UserInputError.prototype = new Error;
UserInputError.name = 'UserInputError';

module.exports = {
  UserInputError
};
