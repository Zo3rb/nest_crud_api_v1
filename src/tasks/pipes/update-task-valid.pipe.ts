import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TaskStatusEnum } from '../TaskStatusEnum';

@Injectable()
export class TaskStatusValidation implements PipeTransform {
  transform(value: any) {
    if (
      value !== TaskStatusEnum.OPEN ||
      value !== TaskStatusEnum.IN_PROGRESS ||
      value !== TaskStatusEnum.DONE
    ) {
      throw new BadRequestException(
        `Status Must be One of ${TaskStatusEnum.OPEN}, ${TaskStatusEnum.IN_PROGRESS} or ${TaskStatusEnum.DONE}`,
      );
    }
    return value;
  }
}
