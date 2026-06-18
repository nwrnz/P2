const produtoLoja = [
    {
        id: 1,
        nome: document.getElementById("produto1").textContent,
        preco: document.getElementById("preco1").textContent
    },
    {
        id: 2,
        nome: document.getElementById("produto2").textContent,
        preco: document.getElementById("preco2").textContent
    },
    {
        id: 3,
        nome: document.getElementById("produto3").textContent,
        preco: document.getElementById("preco3").textContent
    }
];

let produtosCarrinho = [];

function converterPreco(precoTexto){
    return Number( /* pessoal do grupo, isso é pra retornar as casa decimais certas do numero. (to de atestado, faz o L) */
        precoTexto
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    );
}

function formatarMoeda(valor){
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function atualizarQuantidadeProduto(id){
    const qtdProduto = document.getElementById(`qtd-${id}`);
    const produtoNoCarrinho = produtosCarrinho.find(produto => produto.id == id);

    if(qtdProduto){
        qtdProduto.textContent = produtoNoCarrinho ? produtoNoCarrinho.quantidade : 0;
    }
}

function atualizarTodasQuantidades(){
    produtoLoja.forEach(produto => {
        atualizarQuantidadeProduto(produto.id);
    });
}

function mudarQuantidade(id, valor){
    let produtoNoCarrinho = produtosCarrinho.find(produto => produto.id == id);

    if(produtoNoCarrinho){
        produtoNoCarrinho.quantidade += valor;

        if(produtoNoCarrinho.quantidade <= 0){
            produtosCarrinho = produtosCarrinho.filter(produto => produto.id != id);
        }
    } else if(valor > 0){
        const produto = produtoLoja.find(produto => produto.id == id);

        produtosCarrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    atualizarTodasQuantidades();
    renderizarCarrinho();
}

function renderizarCarrinho(){
    const itemDiv = document.getElementById("item");
    const total = document.getElementById("total");

    itemDiv.innerHTML = "";

    let soma = 0;

    if(produtosCarrinho.length === 0){
        itemDiv.innerHTML = `<p class="carrinho-vazio">Seu carrinho está vazio.</p>`;
        total.textContent = "Total: R$ 0,00";
        atualizarTodasQuantidades();
        return;
    }

    produtosCarrinho.forEach(produto => {
        const precoNumero = converterPreco(produto.preco);
        const subtotal = precoNumero * produto.quantidade;

        soma += subtotal;

        const li = document.createElement("li");
        li.className = "cart-item";

        li.innerHTML = `
            <span>
                ${produto.nome} (x${produto.quantidade}) - ${produto.preco}
            </span>

            <div class="cart-actions">
                <button onclick="mudarQuantidade(${produto.id}, -1)">-</button>
                <button onclick="mudarQuantidade(${produto.id}, 1)">+</button>
                <button class="btn-remover" onclick="removerProduto(${produto.id})">Remover</button>
            </div>
        `;

        itemDiv.appendChild(li);
    });

    total.textContent = "Total: " + formatarMoeda(soma);
    atualizarTodasQuantidades();
}

function removerProduto(id){
    produtosCarrinho = produtosCarrinho.filter(produto => produto.id != id);

    atualizarTodasQuantidades();
    renderizarCarrinho();
}

const btnLimpar = document.getElementById("limpar");

btnLimpar.addEventListener("click", function(){
    produtosCarrinho = [];

    atualizarTodasQuantidades();
    renderizarCarrinho();
});

const btnComprar = document.getElementById("comprar");

btnComprar.addEventListener("click", function(){
    const textoAlerta = document.getElementById("texto-comprar");

    if(produtosCarrinho.length > 0){
        textoAlerta.textContent = "Sucesso na compra!";
        textoAlerta.style.color = "green";
    } else {
        textoAlerta.textContent = "Sem itens para comprar!";
        textoAlerta.style.color = "red";
    }

    setTimeout(() => {
        textoAlerta.textContent = "";
    }, 1000);
});

renderizarCarrinho();
