import { Test, TestingModule } from '@nestjs/testing';
import { TrilhaCursosController } from './trilha-cursos.controller';
import { TrilhaCursosService } from './trilha-cursos.service';

describe('TrilhaCursosController', () => {
  let controller: TrilhaCursosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrilhaCursosController],
      providers: [TrilhaCursosService],
    }).compile();

    controller = module.get<TrilhaCursosController>(TrilhaCursosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
