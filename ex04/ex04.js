const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
const formatarMeses = (meses) => {
    const anos = Math.floor(meses / 12);
    const restoMeses = meses % 12;
    if (anos === 0) {
        return `${restoMeses} ${restoMeses === 1 ? "mês" : "meses"}`;
    }
    if (restoMeses === 0) {
        return `${anos} ${anos === 1 ? "ano" : "anos"}`;
    }
    return `${anos} ${anos === 1 ? "ano" : "anos"} e ${restoMeses} ${restoMeses === 1 ? "mês" : "meses"}`;
};
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let totalDepositado = 0;
    let meses = 0;
    while (saldo < meta) {
        meses++;
        if (meses > 600) {
            meses = 600;
            break;
        }
        saldo = saldo * (1 + taxa / 100);
        const depositoDoMes = deposito + (meses % 12 === 0 ? deposito : 0);
        saldo += depositoDoMes;
        totalDepositado += depositoDoMes;
    }
    return { meses, saldo, depositado: totalDepositado };
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const campoMeta = document.getElementById("meta");
const campoDeposito = document.getElementById("deposito");
const campoTaxa = document.getElementById("taxa");
const botao = document.getElementById("calcular");
const saida = document.getElementById("resultado");
botao.addEventListener("click", () => {
    const meta = campoMeta.valueAsNumber;
    const deposito = campoDeposito.valueAsNumber;
    const taxaVazia = campoTaxa.value === "";
    const taxa = campoTaxa.valueAsNumber;
    if (campoMeta.value === "" || campoDeposito.value === "" ||
        !Number.isFinite(meta) || !Number.isFinite(deposito) || meta <= 0 || deposito <= 0) {
        saida.textContent = "Informe valores positivos";
        saida.className = "erro";
        return;
    }
    if (!taxaVazia && (!Number.isFinite(taxa) || taxa < 0)) {
        saida.textContent = "Informe um rendimento válido (zero ou maior).";
        saida.className = "erro";
        return;
    }
    const resultado = taxaVazia
        ? calcularMeses(meta, deposito)
        : calcularMeses(meta, deposito, taxa);
    if (resultado.saldo >= meta) {
        saida.textContent = `Você atinge a meta em ${resultado.meses} meses (${formatarMeses(resultado.meses)}).\n${exibirValor("Saldo final", resultado.saldo, formatarReal)}\n${exibirValor("Total depositado", resultado.depositado, formatarReal)}\n${exibirValor("Rendimento", resultado.saldo - resultado.depositado, formatarReal)}`;
        saida.className = "sucesso";
    }
    else {
        saida.textContent = `Meta inalcançável em 50 anos.\nSaldo após 600 meses: ${formatarReal(resultado.saldo)}`;
        saida.className = "erro";
    }
});
export {};
//# sourceMappingURL=ex04.js.map