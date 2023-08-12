const cardapio = {
    "produtos": [
        {
            "codigo": "cafe",
            "descricao": "Café",
            "valor": "R$ 3,00"
        },
        {
            "codigo": "chantily",
            "descricao": "Chantily (extra do Café)",
            "valor": "R$ 1,50"
        },
        {
            "codigo": "suco",
            "descricao": "Suco Natural",
            "valor": "R$ 6,20"
        },
        {
            "codigo": "sanduiche",
            "descricao": "Sanduíche",
            "valor": "R$ 6,50"
        },
        {
            "codigo": "queijo",
            "descricao": "Queijo (extra do Sanduíche)",
            "valor": "R$ 2,00"
        },
        {
            "codigo": "salgado",
            "descricao": "Salgado",
            "valor": "R$ 7,25"
        },
        {
            "codigo": "combo1",
            "descricao": "1 Suco e 1 Sanduíche",
            "valor": "R$ 9,50"
        },
        {
            "codigo": "combo2",
            "descricao": "1 Café e 1 Sanduíche",
            "valor": "R$ 7,50"
        }
    ]
}

class CaixaDaLanchonete {
    // O método obterProduto recupera os dados de um produto a partir do cardápio.
    obterProduto(produto) {
        const partes = produto.split(',');
        const produtoDados = cardapio.produtos.findIndex((item) => {
            return item.codigo === partes[0];
        });

        return produtoDados === -1 ? 'Item inválido!' : cardapio.produtos[produtoDados];
    }

    // O método obterCodigos recupera os códigos de todos os produtos em uma lista de itens.
    obterCodigos(itens) {
        let codigos = [];

        for (const element of itens) {
            const partes = element.split(',');
            codigos.push(partes[0]);
        }

        return codigos;
    }

    // O método obterValor recupera o valor de um produto.
    obterValor(produto) {
        const valor = this.obterProduto(produto).valor ?? 'Item inválido!';     
        const valorFormatado = valor.slice(3).replace(',', '.') * 100;

        return valorFormatado;
    }

    // O método obterQuantidade recupera a quantidade de um produto no pedido.
    obterQuantidade(produto) {
        const partes = produto.split(',');
        const quantidade = partes[1];

        return quantidade;
    }

    // O método obterValorFinal define que valor final que deve ser mostrado em função do método de pagamento.
    obterValorFinal(valorBruto, metodoDePagamento) {
        if (metodoDePagamento === 'dinheiro') {
            valorBruto *= 0.95;
        }

        if (metodoDePagamento === 'credito') {
            valorBruto *= 1.03;
        }

        valorBruto = (valorBruto / 100).toFixed(2).toString();
        valorBruto = valorBruto.replace('.', ',');

        const valorFinal = `R$ ${valorBruto}`;

        return valorFinal;
    }

    // Método principal da classe responsável por processar tudo necessário e nos retornar o valor da compra de um cliente.
    calcularValorDaCompra(metodoDePagamento, itens) {
        const metodosAceitos = ['dinheiro', 'debito', 'credito'];

        let valorBrutoDoPedido = 0;

        if (!itens || itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        if (!metodosAceitos.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        const codigos = this.obterCodigos(itens);

        for (const element of itens) {

            let quantidade = this.obterQuantidade(element);

            if ((codigos.includes('chantily') && !codigos.includes('cafe')) || (codigos.includes('queijo') && !codigos.includes('sanduiche'))) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            if (!Number.isInteger(quantidade) && quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            let valorItem = this.obterValor(element);

            if (isNaN(valorItem)) {
                return 'Item inválido!';
            }

            valorBrutoDoPedido += valorItem * quantidade;           
        }

        const valorDaCompra = this.obterValorFinal(valorBrutoDoPedido, metodoDePagamento);

        return valorDaCompra;
    }
}

export { CaixaDaLanchonete };
