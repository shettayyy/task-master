import { taskService } from '../../task.service';
import type { MutationResolvers } from './../../../types.generated';
export const deleteTask: NonNullable<MutationResolvers['deleteTask']> = async (
  _parent,
  arg,
  ctx
) => {
  return await taskService.deleteTask(arg.id, ctx.req.user.id);
};
