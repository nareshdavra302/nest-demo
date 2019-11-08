import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/createTaskDto";
import { TaskStatus } from "./taskStatus.enum";
import { GetTasksFilterDto } from "./dto/getTaskFilterDto";
import { User } from "../auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {


    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
    
        if (status) {
          query.andWhere('task.status = :status', { status });
        }
    
        if (search) {
          query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }
    
        const tasks = await query.getMany();
        return tasks;
      }

    async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description } = createTaskDTO;

        let task: Task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;

       await task.save();
       return task;
    }

    // async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    //     const task = 
    // }
    
}