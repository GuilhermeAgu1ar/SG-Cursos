-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "idAssinatura" INTEGER NOT NULL,
    "valorPago" DOUBLE PRECISION NOT NULL,
    "dataPagamento" TEXT,
    "metodoPagamento" TEXT NOT NULL,
    "idTransacaoGateway" TEXT NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);
