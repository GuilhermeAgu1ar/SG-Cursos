import { Test, TestingModule } from '@nestjs/testing';
import { ProgressoAulasService } from './progresso-aulas.service';

describe('ProgressoAulasService', () => {
  let service: ProgressoAulasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressoAulasService],
    }).compile();

    service = module.get<ProgressoAulasService>(ProgressoAulasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
