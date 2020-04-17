export default interface PersonColumn {
    id: "id" | "name" | "last_name" | "status" | "relationType" | "rif_ci" | "description";
    label: string;
    minWidth?: number;
    align?: "right";
    isNumeric?: any;
    component?: any;
  }