export interface InputProps {
  type: string;
  name: 'name' | 'quantity' | 'purchasePrice' | 'salePrice' | 'wholesaleMinimalQuantity' | 'wholesaleUnityPrice';
  label: string;
}

export const inputsProps: InputProps[] = [
  {
    type: 'text',
    name: 'name',
    label: 'Nome do produto:'
  },
  {
    type: 'number',
    name: 'quantity',
    label: 'Quantidade:'
  },
  {
    type: 'text',
    name: 'purchasePrice',
    label: 'Preço unitário de compra:'
  },
  {
    type: 'text',
    name: 'salePrice',
    label: 'Preço unitário de venda:'
  },
  {
    type: 'number',
    name: 'wholesaleMinimalQuantity',
    label: 'Quantidade minima para preço de atacado:'
  },
  {
    type: 'text',
    name: 'wholesaleUnityPrice',
    label: 'Preço unitário de venda no atacado:'
  }
] 