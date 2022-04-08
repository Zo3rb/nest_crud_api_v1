import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TaskStatusEnum } from '../TaskStatusEnum';

@Injectable()
export class TaskStatusValidation implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatusEnum.OPEN,
    TaskStatusEnum.IN_PROGRESS,
    TaskStatusEnum.DONE,
  ];

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }
}
