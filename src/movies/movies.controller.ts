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
import { CreateMovieDto } from './dto/create-movie.dto';
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
    getOne (@Param('id') movieId: number): Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create (@Body() movieData: CreateMovieDto) {
        console.log('movieData', movieData);
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove (@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    patch (@Param('id') movieId: number, @Body() updateData: CreateMovieDto) {
        return this.moviesService.update(movieId, updateData);
    }
}
