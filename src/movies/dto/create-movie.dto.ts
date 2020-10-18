import { IsString, IsNumber } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    readonly name: string;

    @IsNumber()
    readonly year: number;

    @IsString({ each: true })
    readonly geners: string[];
}