import { IsDefined } from 'class-validator';

export class UpdateUserDTO {
  @IsDefined()
  name: string;

  constructor(name) {
    this.name = name;
  }
}
