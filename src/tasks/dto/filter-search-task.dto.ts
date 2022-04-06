import { TaskStatusEnum } from '../Task.model';

export class TasksFilteredDto {
  status: TaskStatusEnum;
  search: string;
}
