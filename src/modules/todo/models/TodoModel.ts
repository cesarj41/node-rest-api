import {IsString, IsBoolean} from "class-validator";

export class TodoModel {
  
  @IsString()
  public id: string;

  @IsString()
  public name: string;
  
  @IsBoolean()
  public completed: boolean;
}