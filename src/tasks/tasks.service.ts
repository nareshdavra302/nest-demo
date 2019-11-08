import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum'; 
import { CreateTaskDTO } from './dto/createTaskDto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDto } from './dto/getTaskFilterDto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {


    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        let found = await this.taskRepository.findOne(id);

        if(!found) { throw new NotFoundException(`Task with id ${id} not found`); }

        return found;
    }

   async createTask( createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO, user);
    }

    async updateTaskStatus (id: number, status: TaskStatus) {
        const task: Task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async deleteTask(id: number): Promise<Task> {
        const task: Task = await this.getTaskById(id);
        await task.remove();
        return task;

    }
}
