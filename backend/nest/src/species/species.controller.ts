import { Controller, Get } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Species } from './species.entity';

@Controller('species')
@ApiTags('Species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService){}

    @Get()
    @ApiOperation({summary: '자동완성할 식물 종 목록'})
    async findSpecies(): Promise<Species[]>{
        return await this.speciesService.speciesFind();
    }

}
