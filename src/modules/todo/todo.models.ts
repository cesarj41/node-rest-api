import {IsString, IsBoolean, IsOptional} from "class-validator";

export class CreateTodoModel {
  @IsString()
  public name: string;

  @IsOptional()
  @IsBoolean()
  public completed: boolean;
}