module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    resetPasswordLink: {
      type: String,
      default: "",
    },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("users", schema);
  return User;
};
