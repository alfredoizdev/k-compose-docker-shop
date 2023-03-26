import { IUser } from '../../interfaces/User.interfaces';
import { User } from '../../models/User';
import { Password } from '../../services/password';
import { singToken } from '../../services/jwt';

export const signinResolvers = {
  Mutation: {
    userLogin: async (_: any, { email, password }: IUser): Promise<string> => {
      const exitingUser = await User.findOne({ email });

      if (!exitingUser) {
        throw new Error('Invalid credential');
      }

      const passwordMatch = await Password.compare(exitingUser.password, password);

      if (!passwordMatch) {
        throw new Error('Invalid credential');
      }

      const token = singToken(exitingUser);

      return token;
    },
  },
};
