import { Test, TestingModule } from '@nestjs/testing';
import { ProgressoAulasController } from './progresso-aulas.controller';
import { ProgressoAulasService } from './progresso-aulas.service';

describe('ProgressoAulasController', () => {
  let controller: ProgressoAulasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressoAulasController],
      providers: [ProgressoAulasService],
    }).compile();

    controller = module.get<ProgressoAulasController>(ProgressoAulasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
