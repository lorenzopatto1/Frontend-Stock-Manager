import * as yup from "yup";

const isPositiveMonetaryValue = () => {
  return yup
    .string()
    .test("is-valid-amount", "O valor deve ser maior que 0", (value) => {
      if (!value) return true;
      const parsed = parseFloat(value.replace(/[^\d.-]/g, ""));
      return !isNaN(parsed) && parsed > 0;
    });
};

export const productFormSchema = yup.object().shape({
  type: yup.number().required("Por favor, insira o nome do produto"),
  name: yup.string().required("Por favor, insira o nome do produto"),
  quantity: yup
    .number()
    .typeError("Por favor, insira a quantidade do produto")
    .positive("A quantidade deve ser maior que 0")
    .integer("O numero deve ser inteiro")
    .required("Por favor, insira a quantidade do produto"),
  purchasePrice: isPositiveMonetaryValue().required(
    "Por favor, informe o valor de compra"
  ),
  percentual: isPositiveMonetaryValue(),
  salePrice: isPositiveMonetaryValue().required(
    "Por favor, informe o valor de venda"
  ),
  wholesaleMinimalQuantity: yup
    .number()
    .typeError("O valor deve ser um número")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .default(null),
  wholesaleUnityPrice: isPositiveMonetaryValue()
    .typeError("O valor deve ser um número positivo")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .default(null),
  group: yup.string().required("Por favor, informe a categoria do produto"),
  validationDate: yup
    .date()
    .typeError("O valor deve ser uma data")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .default(null),
});
