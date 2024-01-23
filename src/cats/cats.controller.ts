import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cats } from './cats.entity';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}
    @Get("/cats")
    async findAll(): Promise<Cats[]>{
        return this.catsService.findAll();
    }
}
