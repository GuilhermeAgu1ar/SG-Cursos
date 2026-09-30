-- CreateTable
CREATE TABLE "ProgressoAula" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idAula" INTEGER NOT NULL,
    "dataConclusao" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "ProgressoAula_pkey" PRIMARY KEY ("id")
);
