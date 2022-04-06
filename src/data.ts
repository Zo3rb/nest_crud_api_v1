/* 
    This File Represents a Dummy Data for The Version One Of the Application
*/
import { TaskStatusEnum } from './tasks/Task.model';

export default [
  {
    id: '1',
    title: 'The First Task',
    description: 'To Demonstrate Seeder',
    status: TaskStatusEnum.OPEN,
  },
  {
    id: '2',
    title: 'The Second Task',
    description: 'To Demonstrate Seeder',
    status: TaskStatusEnum.IN_PROGRESS,
  },
  {
    id: '3',
    title: 'The Third Task',
    description: 'To Demonstrate Seeder',
    status: TaskStatusEnum.DONE,
  },
];
