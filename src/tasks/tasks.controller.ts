import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilteredDto } from './dto/filter-search-task.dto';
import { TaskStatusValidation } from './pipes/update-task-valid.pipe';
import { Task } from '../entity/Task';
import { TaskStatusEnum } from './TaskStatusEnum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: TasksFilteredDto,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getSingleTask(@Param('id') taskId: number): Promise<Task> {
    return this.tasksService.getSingleTask(taskId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  updateTask(
    @Param('id') taskId: number,
    @Body('status', TaskStatusValidation) newStatus: TaskStatusEnum,
  ): Promise<object> {
    return this.tasksService.updateTask(taskId, newStatus);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: number): Promise<object> {
    return this.tasksService.deleteTask(taskId);
  }
}
