-- CreateTable
CREATE TABLE "Matricula" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "dataMatricula" TEXT,
    "dataConclusao" TEXT,

    CONSTRAINT "Matricula_pkey" PRIMARY KEY ("id")
);
