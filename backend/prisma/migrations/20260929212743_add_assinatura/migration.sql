-- CreateTable
CREATE TABLE "Assinatura" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idPlano" INTEGER NOT NULL,
    "dataInicio" TEXT,
    "dataFim" TEXT,

    CONSTRAINT "Assinatura_pkey" PRIMARY KEY ("id")
);
