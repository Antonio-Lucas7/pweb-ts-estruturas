function calcularTotal(valor, parcelas) {
    return parcelas <= 3 ? valor : valor * 1.02 ** parcelas;
}
function simularParcelamento(preco, entrada) {
    let valorFinanciado = preco;
    if (typeof entrada !== "undefined") {
        valorFinanciado = preco - entrada;
    }
    let linhas = "";
    for (let quantidade = 1; quantidade <= 12; quantidade++) {
        if (quantidade === 7 || quantidade === 8 || quantidade === 9 || quantidade === 11) {
            continue;
        }
        const total = calcularTotal(valorFinanciado, quantidade);
        const valorParcela = total / quantidade;
        if (valorParcela < 50) {
            break;
        }
        const juros = quantidade <= 3 ? "sem juros" : "2% a.m.";
        linhas += `<tr><td>${quantidade}x</td><td>R$ ${valorParcela.toFixed(2)}</td><td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
    }
    return linhas;
}
const campoPreco = document.getElementById("preco");
const campoEntrada = document.getElementById("entrada");
const botao = document.getElementById("simular");
const saida = document.getElementById("resultado");
const corpoParcelas = document.getElementById("parcelas");
botao.addEventListener("click", () => {
    const preco = campoPreco.valueAsNumber;
    const entradaInformada = campoEntrada.value !== "";
    const entrada = campoEntrada.valueAsNumber;
    corpoParcelas.innerHTML = "";
    if (campoPreco.value === "" || !Number.isFinite(preco) || preco <= 0) {
        saida.textContent = "Informe um preço válido.";
        saida.className = "erro";
        return;
    }
    if (entradaInformada && (!Number.isFinite(entrada) || entrada < 0)) {
        saida.textContent = "Informe uma entrada válida.";
        saida.className = "erro";
        return;
    }
    if (entradaInformada && entrada >= preco) {
        saida.textContent = "A entrada cobre o valor total. Não há parcelas.";
        saida.className = "sucesso";
        return;
    }
    const financiado = entradaInformada ? preco - entrada : preco;
    saida.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
    saida.className = "";
    // Quando a entrada está vazia, a função é chamada sem o segundo argumento.
    corpoParcelas.innerHTML = entradaInformada
        ? simularParcelamento(preco, entrada)
        : simularParcelamento(preco);
});
export {};
//# sourceMappingURL=ex03.js.map