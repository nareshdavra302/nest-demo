import { Controller, Get, Post, Body, Delete, Put, Param, ParseIntPipe, ValidationPipe, UsePipes, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task} from './task.entity'
import { CreateTaskDTO } from './dto/createTaskDto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './taskStatus.enum';
import { GetTasksFilterDto } from './dto/getTaskFilterDto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/getUser.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(@Query(ValidationPipe) filteDto: GetTasksFilterDto): Promise<Task[]> {
       return this.taskService.getTasks(filteDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
       return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO: CreateTaskDTO, @GetUser() user: User) {
        return this.taskService.createTask(createTaskDTO, user);
    }

    @Put('/:id/status')
    updateTaskStatus(    
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.deleteTask(id);
    }

}
