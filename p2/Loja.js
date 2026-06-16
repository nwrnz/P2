const produtoLoja = [
    {id: 1, nome: document.getElementById("produto1").textContent, preco: document.getElementById("preco1").textContent},
    {id: 2, nome: document.getElementById("produto2").textContent, preco: document.getElementById("preco2").textContent},
    {id: 3, nome: document.getElementById("produto3").textContent, preco: document.getElementById("preco3").textContent}
];
let produtosCarrinho = [];

function mudarQuantidade(id, valor){
    const existente = produtosCarrinho.find(prod => prod.id == id);

    if(existente){
        existente.quantidade += valor;
        if(existente.quantidade <= 0){
            produtosCarrinho = produtosCarrinho.filter(prod => prod.id != id);
        }
    } else if(valor > 0){
        const produto = produtoLoja.find(prod => prod.id == id);
        produtosCarrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    const qtdSpan = document.getElementById(`qtd-${id}`);
    const novoItem = produtosCarrinho.find(prod => prod.id == id);
    qtdSpan.textContent = novoItem ? novoItem.quantidade : 0;

    renderizarCarrinho();
}

function renderizarCarrinho(){
    const itemDiv = document.getElementById("item");
    const total = document.getElementById("total");

    itemDiv.innerHTML = "";

    let soma = 0;

    produtosCarrinho.forEach(produto => {
        soma = soma + (parseFloat(produto.preco.replace("R$", "").replace(",", ".").trim()) * produto.quantidade);
        const li = document.createElement("li");
        li.className = "cart-item";

        li.innerHTML = `
            <span>${produto.nome} (x${produto.quantidade}) - ${produto.preco}</span>
            <div>
                <button onclick="mudarQuantidade(${produto.id}, -1)">-</button>
                <button onclick="mudarQuantidade(${produto.id}, 1)">+</button>
                <button onclick="removerProduto(${produto.id})">Remover</button>
            </div>
        `;

        itemDiv.appendChild(li);
    });

    total.textContent = "Total: R$" + soma.toFixed(2);
}

function removerProduto(id){
    produtosCarrinho = produtosCarrinho.filter(produto => produto.id != id);
    renderizarCarrinho();
}

const btnLimpar = document.getElementById("limpar");
btnLimpar.addEventListener("click", function(){
    if(produtosCarrinho.length > 0){
        produtosCarrinho = [];
        renderizarCarrinho();
    }
});

const btnComprar = document.getElementById("comprar");
btnComprar.addEventListener("click", function(){
    const textoAlerta = document.getElementById("texto-comprar");
    if(produtosCarrinho.length > 0){
        renderizarCarrinho();
        textoAlerta.textContent = "Sucesso na compra!";
        textoAlerta.style.color = "green";
        setTimeout(() => {
            textoAlerta.textContent = "";
        }, 1000);
    } else {
        textoAlerta.textContent = "Sem itens para comprar!";
        textoAlerta.style.color = "red";
        setTimeout(() => {
            textoAlerta.textContent = "";
        }, 1000);
    }
});