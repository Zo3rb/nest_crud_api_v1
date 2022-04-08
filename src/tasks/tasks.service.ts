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

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  // getTasks(filterDto: TasksFilteredDto): Promise<Task[]> {
  //   const { status, search } = filterDto;
  // }

  async getSingleTask(id?: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException();
    } else {
      return task;
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTaskToCreate = await this.tasksRepository.save({
      title,
      description,
      status: TaskStatusEnum.OPEN,
    });

    return newTaskToCreate;
  }

  async updateTask(taskId: number, newStatus: TaskStatusEnum): Promise<object> {
    const taskToUpdate = await this.tasksRepository.update(
      { id: taskId },
      { status: newStatus },
    );

    const { affected } = taskToUpdate;
    if (!affected) {
      throw new NotFoundException();
    }

    return { success: true, message: 'Successfully Updated' };
  }

  // updateTask(taskId: string, newStatus: TaskStatusEnum): Task {
  //   let taskToUpdate = this._tasks.find((task) => task.id === taskId);
  //   taskToUpdate.status = newStatus;
  //   return taskToUpdate;
  // }

  async deleteTask(taskId: number): Promise<object> {
    const taskToDelete = await this.tasksRepository.delete({ id: taskId });

    const { affected } = taskToDelete;
    if (!affected) {
      throw new NotFoundException();
    }

    return { success: true, message: 'Successfully Deleted' };
  }
}
