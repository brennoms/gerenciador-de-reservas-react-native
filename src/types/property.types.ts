export type PropertyProps = {
  id: number;
  name: string;
  address: string;
  image: string;
};

export type AddPropertyProps = Omit<PropertyProps, "id">;
