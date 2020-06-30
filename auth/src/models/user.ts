import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
  tokens: string[];
  addToken(token: string): void;
  removeToken(): void;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    tokens: [{ type: String }],
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret.tokens;
      },
    },
    timestamps: true,
  }
);
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await bcrypt.hash(this.get("password"), 8);
    this.set("password", hashed);
  }
  done();
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
userSchema.methods.addToken = async function (token: string) {
  const user = this;
  user.tokens = user.tokens.concat(token);
  await user.save();
};
userSchema.methods.removeToken = async function (token: string) {
  const user = this;
  user.tokens = [];
  await user.save();
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
