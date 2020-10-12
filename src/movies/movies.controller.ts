import {
    Controller,
    Get,
    Post,
    Delete,
    Put,
    Patch,
    Param,
    Body,
    Query
} from '@nestjs/common';

@Controller('movies') // EndPoint
export class MoviesController {
    @Get()
    getAll () {
        return 'All Movies';
    }

    @Get('search')
    search (@Query('year') searchingYear: string) {
        return `Searching for a movie with a title Year => ${searchingYear}`;
    }

    @Get('/:id')
    getOne (@Param('id') movieId:string) {
        return `ID => ${movieId}: one Movie`;
    }

    @Post()
    create (@Body() movieData) {
        console.log('movieData', movieData);
        return 'Create'
    }

    @Delete('/:id')
    remove (@Param('id') movieId:string) {
        return `ID => ${movieId} Movie Delete`;
    }

    @Patch('/:id')
    patch (@Param('id') movieId:string, @Body() updateData) {
        return {
            updateMovie: movieId,
            ...updateData
        }
    }
}
