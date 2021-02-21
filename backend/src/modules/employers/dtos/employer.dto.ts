import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { strings } from 'src/shared/utils/strings';

export class CreateEmployerDTO {
  @IsNotEmpty({ message: strings.error.requiredField('Name') })
  @IsString()
  @MinLength(3, { message: 'Name must contain at least 3 characters' })
  name: string;

  @IsNotEmpty({ message: strings.error.requiredField('Age') })
  @IsInt({ message: 'age must be a numeric field' })
  age: number;

  @IsNotEmpty({ message: strings.error.requiredField('Role') })
  @MinLength(3, { message: 'Name must contain at least 3 characters' })
  role: string;
}
