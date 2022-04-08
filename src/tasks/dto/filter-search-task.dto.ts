import { TaskStatusEnum } from '../TaskStatusEnum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class TasksFilteredDto {
  @IsOptional()
  @IsIn([TaskStatusEnum.OPEN, TaskStatusEnum.IN_PROGRESS, TaskStatusEnum.DONE])
  status: TaskStatusEnum;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
