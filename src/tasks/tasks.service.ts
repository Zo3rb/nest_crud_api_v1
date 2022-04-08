import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';

import { TaskStatusEnum } from './TaskStatusEnum';
import { TasksFilteredDto } from './dto/filter-search-task.dto';
import { Task } from '../entity/Task';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  // getTasks(filterDto: TasksFilteredDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) tasks = tasks.filter((task) => task.status === status);
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  // getSingleTask(id: string): Task {
  //   const task = this._tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException();
  //   }
  //   return task;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const newTaskToCreate = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatusEnum.OPEN,
  //   };

  //   this._tasks.push(newTaskToCreate);

  //   return newTaskToCreate;
  // }

  // updateTask(taskId: string, newStatus: TaskStatusEnum): Task {
  //   let taskToUpdate = this._tasks.find((task) => task.id === taskId);
  //   taskToUpdate.status = newStatus;
  //   return taskToUpdate;
  // }

  // deleteTask(taskId: string): void {
  //   const taskToDelete = this.getSingleTask(taskId);
  //   this._tasks = this._tasks.filter((task) => task.id !== taskId);
  // }
}
