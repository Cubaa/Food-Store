export interface IAddProductTypes {
  name: string | undefined;
  default_volume?: number;
  critical_amount_level?: number;
  optimal_amount_level?: number;
  recipe_amount?: number;
  type?: string;
  status?: string;
  measure_type?: string;
  category_id: number | undefined;
  tax_id?: number;
  categoryName?: string | undefined;
}
