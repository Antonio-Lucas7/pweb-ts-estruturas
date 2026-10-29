const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
function lerPrecos(texto) {
    const linhas = texto.split("\n");
    const precos = [];
    let ignorados = 0;
    for (const linha of linhas) {
        if (precos.length >= 20) {
            break;
        }
        const limpa = linha.trim();
        if (limpa === "") {
            continue;
        }
        const numero = Number(limpa.replace(",", "."));
        if (!Number.isFinite(numero) || numero <= 0) {
            ignorados++;
            continue;
        }
        precos.push(numero);
    }
    return { precos, ignorados };
}
function somarItens(...precos) {
    return precos.reduce((soma, preco) => soma + preco, 0);
}
function calcularDesconto(total, valor) {
    if (typeof valor === "number") {
        return total * valor / 100;
    }
    switch (valor.toUpperCase()) {
        case "BEMVINDO":
            return total * 0.10;
        case "PROMO20":
            return total * 0.20;
        case "MENOS15":
            return total >= 100 ? 15 : 0;
        default:
            return 0;
    }
}
const campoItens = document.getElementById("itens");
const campoCupom = document.getElementById("cupom");
const campoFidelidade = document.getElementById("fidelidade");
const botao = document.getElementById("fechar");
const saida = document.getElementById("resultado");
botao.addEventListener("click", () => {
    const leitura = lerPrecos(campoItens.value);
    const precos = leitura.precos;
    if (precos.length === 0) {
        saida.textContent = "Nenhum item válido";
        saida.className = "erro";
        return;
    }
    const subtotal = somarItens(...precos);
    const cupomDigitado = campoCupom.value.trim();
    let descontoCupom = 0;
    let mensagemCupom = "";
    if (cupomDigitado !== "") {
        descontoCupom = calcularDesconto(subtotal, cupomDigitado);
        const cupomConhecido = ["BEMVINDO", "PROMO20", "MENOS15"].includes(cupomDigitado.toUpperCase());
        const aplicavel = cupomDigitado.toUpperCase() !== "MENOS15" || subtotal >= 100;
        if (!cupomConhecido || !aplicavel) {
            mensagemCupom = "Cupom inválido ou não aplicável.";
        }
        else {
            mensagemCupom = `Cupom ${cupomDigitado.toUpperCase()}: - ${formatarReal(descontoCupom)}`;
        }
    }
    const aposCupom = subtotal - descontoCupom;
    const descontoFidelidade = campoFidelidade.checked ? calcularDesconto(aposCupom, 5) : 0;
    const total = aposCupom - descontoFidelidade;
    const quantidadeIgnorada = leitura.ignorados > 0
        ? ` (${leitura.ignorados} ${leitura.ignorados === 1 ? "linha ignorada" : "linhas ignoradas"})`
        : "";
    const linhas = [
        `Itens: ${precos.length}${quantidadeIgnorada}`,
        `Subtotal: ${formatarReal(subtotal)}`
    ];
    if (mensagemCupom !== "") {
        linhas.push(mensagemCupom);
    }
    if (campoFidelidade.checked) {
        linhas.push(`Fidelidade (5%): - ${formatarReal(descontoFidelidade)}`);
    }
    linhas.push(`Total a pagar: ${formatarReal(total)}`);
    saida.textContent = linhas.join("\n");
    saida.className = "sucesso";
});
export {};
//# sourceMappingURL=ex05.js.map