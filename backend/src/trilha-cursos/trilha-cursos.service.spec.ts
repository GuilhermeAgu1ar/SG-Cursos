import { Test, TestingModule } from '@nestjs/testing';
import { TrilhaCursosService } from './trilha-cursos.service';

describe('TrilhaCursosService', () => {
  let service: TrilhaCursosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrilhaCursosService],
    }).compile();

    service = module.get<TrilhaCursosService>(TrilhaCursosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
