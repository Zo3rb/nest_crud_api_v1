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

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilteredDto } from './dto/filter-search-task.dto';
import { TaskStatusValidation } from './pipes/update-task-valid.pipe';
import { Task } from '../entity/Task';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: TasksFilteredDto,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  // @Get(':id')
  // getSingleTask(@Param('id') taskId: string): Task {
  //   return this.tasksService.getSingleTask(taskId);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Patch(':id')
  // updateTask(
  //   @Param('id') taskId,
  //   @Body('status', TaskStatusValidation) newStatus,
  // ): Task {
  //   return this.tasksService.updateTask(taskId, newStatus);
  // }

  // @Delete(':id')
  // deleteTask(@Param('id') taskId: string): string {
  //   this.tasksService.deleteTask(taskId);
  //   return 'Successfully Deleted Task';
  // }
}
