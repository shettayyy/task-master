import { userService } from './../../user.service';
import { GraphQLError } from 'graphql';
import type { MutationResolvers } from './../../../types.generated';
import { ErrorCode } from '@task-master/shared/types';

export const logout: NonNullable<MutationResolvers['logout']> = async (
  _parent,
  _arg,
  ctx
) => {
  try {
    // call logout function
    await userService.logoutUser(ctx.req);

    return true;
  } catch (error) {
    throw new GraphQLError((error as Error).message, {
      extensions: {
        code: ErrorCode.UserLogoutFailed,
      },
    });
  }
};
