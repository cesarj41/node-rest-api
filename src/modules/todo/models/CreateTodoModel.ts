import {IsString, IsBoolean, IsOptional} from "class-validator";

export class CreateTodoModel {
  @IsString()
  public content: string;
  
  @IsOptional()
  @IsBoolean()
  public completed: boolean;
}