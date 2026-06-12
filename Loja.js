const produtoLoja = [
{id: 1, nome: produto1, preco: preco1},
{id: 2, nome: produto2, preco:preco2},
{id: 3, nome: produto3, preco: preco3}
];
let produtosCarrinho =[];

function rendenizarProdutos(){
    const div = document.getElementById("item")
    div.innerHTML ="";

    produtoLoja.forEach(p => {
        const ul = document.createElement("ul");
        ul.className ="product";

        ul.innerHTML = `
        <span>${p.nome} - R$ ${p.preco}<span>
        <button onclick="adicionarAoCarrinho(${p.id})">Adicionar</button>
       `;

       div.appendChild(ul);
    })
}

rendenizarProdutos();

function adicionarAoCarrinho(id){
    const produto = produtoLoja.find(prod => prod.id == id);

    const existente = produtosCarrinho.find(prod=> prod.id == id);

    if(existente){
        existente.quantidade++;
    }
    else{
        produtosCarrinho.push(
            {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
            }
        );
    }
    renderizarCarrinho();
}

function renderizarCarrinho(){
    const div = document.getElementById("item");
    const total = document.getElementById("total");

    div.innerHTML ="";

    let soma = 0;

    produtosCarrinho.forEach(produto => {
        somaTotal = somaTotal + (produto.preco *produto.quantidade)
        const ul = document.createElement("li");
        btnLimpar.className = "cart-item"

        li.innerHTML=`
        <span>${produto.nome} (x${produto.preco *produto.quantidade}) - R$ ${produto.preco * produto.qauntidade}</span>
        <div>
        <button onclick="mudarQuantidade(${produto.id},1)">
        +
        </button>
        <button onclick="mudarQuantidade(${produto.id}, -1 )">
               -
        </button>
        <button onclick="removerProduto(${produto.id})">
        Remover
        </button>
        </div>              
        `;
        li.appendChild(div);
    });
    total.textContent = "Total: R$" + somaTotal;
}
function mudarQuantidade(){
    produtosCarrinho = produtosCarrinho.map(produto =>{
        if(id == produto,id){
            return{
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade + valor
        }
    }
    return produto;
}).filter(produto=> produto.quantidade > 0);

renderizarCarrinho();
}
function removerProduto(id){
    produtosCarrinho = produtosCarrinho .filter(produto => produto.id != id);

    renderizarCarrinho();

}
const btnLimpar= document.getElementById("limpar")
btnLimpar.addEventListener("click", function(){
    if(produtosCarrinho.length > 0){
        produtosCarrinho = [];
        renderizarCarrinho();
    }
})
const btnComprar= document.getElementById("comprar");
btnComprar.addEventListener("click", function(){
    let = textoAlerta = document.getElementById("texto-comprar")
    if(produtosCarrinho.length > 0){
        renderizarCarrinho();

        textoAlerta.textContent ="Sucesso na compra!";
        textoAlerta.style.color ="green";
        setTimeout(() => {
            textoAlerta.textContent=""
        }, 1000);
}
    else{
        textoAlerta.textContent="Sem itens para comprar!";
        textoAlerta.style.color="red";
        setTimeout(() => {
            textoAlerta.textContent=""
        }, 1000);
    }
})

