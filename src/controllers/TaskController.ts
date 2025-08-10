import { getRepository } from "../data-source";
import { Task } from "../entities/Task";

export class TaskController {
    private readonly taskRepository = getRepository(Task);

    async create(title: string, description: string, completed?: boolean): Promise<Task> {
        const task = this.taskRepository.create({ title, description, completed });
        return await this.taskRepository.save(task);
    }

    async getAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getById(id: number): Promise<Task | null> {
        return await this.taskRepository.findOneBy({ id });
    }

    async update(id: number, updates: Partial<Task>): Promise<Task | null> {
        await this.taskRepository.update(id, updates);
        return await this.getById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.taskRepository.delete(id);
        const wasDeleted = (result.affected ?? 0) > 0;
        return wasDeleted;
    }
}
