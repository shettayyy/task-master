import { Task } from '@task-master/client/graphql';
import clsx from 'clsx';
import { memo } from 'react';

export interface TaskCardProps {
  task: Task;
  renderAction?: (task: Task) => React.ReactNode;
}

export const TaskCard: React.FC<TaskCardProps> = memo((props) => {
  const { task } = props;
  const { title, description, taskStatus, createdAt } = task;

  // createdAt is a timestamp
  const formattedDate = new Date(Number(createdAt)).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <li>
      <span
        className={clsx('px-3 py-1 text-xs font-semibold', {
          'bg-blue-100 text-blue-800': taskStatus.status === 'To Do',
          'bg-yellow-100 text-yellow-800': taskStatus.status === 'In Progress',
          'bg-green-100 text-green-800': taskStatus.status === 'Done',
        })}
      >
        {taskStatus.status}
      </span>

      <div className="rounded-lg bg-neutral-800 shadow-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-orange-400 text-xs">{formattedDate}</span>

          {props.renderAction?.(task)}
        </div>

        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-neutral-400 text-sm capitalize">{description}</p>
      </div>
    </li>
  );
});
