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
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') // EndPoint
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll () : Movie[] {
        return this.moviesService.getAll();
    }

    @Get('search')
    search (@Query('year') searchingYear: string) {
        return `Searching for a movie with a title Year => ${searchingYear}`;
    }

    @Get('/:id')
    getOne (@Param('id') movieId:string): Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create (@Body() movieData) {
        console.log('movieData', movieData);
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove (@Param('id') movieId:string) {
        return this.moviesService.deleteOne(id);
    }

    @Patch('/:id')
    patch (@Param('id') movieId:string, @Body() updateData) {
        return {
            updateMovie: movieId,
            ...updateData
        }
    }
}
