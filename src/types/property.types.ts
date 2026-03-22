export type PropertyProps = {
  id: number;
  image: string;
  name: string;
  address: string;
};

export type AddPropertyProps = Omit<PropertyProps, "id">;
