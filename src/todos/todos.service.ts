import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {}

  async create(dto: { title: string }) {
    const todo = this.todoRepository.create(dto); 
    return await this.todoRepository.save(todo);
  }

  findAll() {
    return this.todoRepository.find();
  }

  findOne(id: number) {
    return this.todoRepository.findOne({where: {id}});
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({where: {id}});
    Object.assign(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne({where: {id}});
    return this.todoRepository.remove(todo);
  }
}
