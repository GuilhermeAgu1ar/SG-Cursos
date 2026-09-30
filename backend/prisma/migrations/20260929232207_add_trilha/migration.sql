-- CreateTable
CREATE TABLE "Trilha" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "Trilha_pkey" PRIMARY KEY ("id")
);
