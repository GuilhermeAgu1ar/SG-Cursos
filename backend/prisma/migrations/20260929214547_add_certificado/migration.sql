-- CreateTable
CREATE TABLE "Certificado" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "idTrilha" INTEGER,
    "codigoVerificacao" TEXT NOT NULL,
    "dataEmissao" TEXT,

    CONSTRAINT "Certificado_pkey" PRIMARY KEY ("id")
);
