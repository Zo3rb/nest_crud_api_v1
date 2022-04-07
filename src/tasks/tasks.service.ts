import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import initialData from '../data';
import { Task } from './Task.model';
import { TaskStatusEnum } from './Task.model';
import { TasksFilteredDto } from './dto/filter-search-task.dto';

@Injectable()
export class TasksService {
  private _tasks: Task[] = [...initialData];

  getAllTasks(): Task[] {
    return this._tasks;
  }

  getTasks(filterDto: TasksFilteredDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) tasks = tasks.filter((task) => task.status === status);
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getSingleTask(id: string): Task {
    const task = this._tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTaskToCreate = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatusEnum.OPEN,
    };

    this._tasks.push(newTaskToCreate);

    return newTaskToCreate;
  }

  updateTask(taskId: string, newStatus: TaskStatusEnum): Task {
    let taskToUpdate = this._tasks.find((task) => task.id === taskId);
    taskToUpdate.status = newStatus;
    return taskToUpdate;
  }

  deleteTask(taskId: string): void {
    const taskToDelete = this.getSingleTask(taskId);
    this._tasks = this._tasks.filter((task) => task.id !== taskId);
  }
}
