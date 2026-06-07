export interface Categoria {
  cat_codigo: number;
  cat_nome: string;
}

export interface FormaPagamento {
  for_codigopagamento: number;
  for_forma: string;
}

export interface Garcom {
  gar_codigo: number;
  gar_nome: string;
  gar_horariotrabalho: string;
}

export interface Cliente {
  cli_codigo: number;
  cli_nome: string;
  cli_cpf: string;
  cli_telefone: string;
  cli_email: string;
  cli_datanascimento: string;
}

export interface Cardapio {
  car_codigo: number;
  car_nome: string;
  car_preco: string; 
  car_unidade: string;
  categoria: string; 
}

export interface Pedido {
  ped_numerovenda: number;
  ped_data: string;
  ped_valortotal: string;
  ped_numeropessoas: number;
  cliente: string; 
  status_cliente: string;
  forma_pagamento: string;
}

export interface ItemPedido {
  item_numeroitem: number;
  item_quantidade: number;
  item_valorunitario: string;
  item_valortotalitem: string;
  prato: string;
  garcom: string;
  pedido: number;
}