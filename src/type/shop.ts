import {Drug} from "@/type/drug";

export type Shop={
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  drugs?: Drug[] | null;
}
