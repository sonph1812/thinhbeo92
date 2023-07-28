import { User } from "../../common/entities/user.entity";

const userResponseSerializer = (user: User) => {
  delete user.password;
  delete user.hash;
  delete user.previousPassword;
  delete user.previousUsername;
};

export default userResponseSerializer;
