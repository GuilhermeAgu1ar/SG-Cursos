-- CreateTable
CREATE TABLE "Modulo" (
    "id" SERIAL NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("id")
);
