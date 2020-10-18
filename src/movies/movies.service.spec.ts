import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });


  describe('getOne', () => {
    it('should return movie', () => {
      service.create({
        title: 'test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () =>  {
      const id = 123123;
      try {
        service.getOne(id);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID: ${id} not found`);
      }
    })
  });


  describe('deleteOne', () => {
    it('delete a Movie', () => {
      service.create({
        title: 'test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });

    it('should return 404 error', () => {
      const id = 123123;
      try {
        service.deleteOne(id);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID: ${id} not found`);
      }
    })
  });


  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'test Movie',
        genres: ['test'],
        year: 2000,
      });

      const title = 'updated test';
      service.update(1, { title });
      const movie = service.getOne(1);
      expect(movie.title).toEqual(title);
    });

    it('should throw a NotFoundException', () => {
      const id = 123123;
      try {
        service.update(id, { title: 'error' });
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
