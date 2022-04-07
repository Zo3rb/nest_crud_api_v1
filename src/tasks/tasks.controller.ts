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
import { Task } from './Task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilteredDto } from './dto/filter-search-task.dto';
import { TaskStatusValidation } from './pipes/update-task-valid.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: TasksFilteredDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasks(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get(':id')
  getSingleTask(@Param('id') taskId: string): Task {
    return this.tasksService.getSingleTask(taskId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  updateTask(
    @Param('id') taskId,
    @Body('status', TaskStatusValidation) newStatus,
  ): Task {
    return this.tasksService.updateTask(taskId, newStatus);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string): string {
    this.tasksService.deleteTask(taskId);
    return 'Successfully Deleted Task';
  }
}
