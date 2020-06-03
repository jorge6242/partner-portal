export default interface Columns {
    id: "id" | "name" | "slug" | "description" | "order";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }
  