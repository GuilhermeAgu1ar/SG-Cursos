-- CreateTable
CREATE TABLE "TrilhaCurso" (
    "id" SERIAL NOT NULL,
    "idTrilha" INTEGER NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "TrilhaCurso_pkey" PRIMARY KEY ("id")
);
