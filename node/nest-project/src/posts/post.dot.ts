import { ApiProperty } from "@nestjs/swagger"
 
export class CreateGuardDto {
    @ApiProperty({ description: "姓名", example: "xxx" })
    name: string
    @ApiProperty({ description:"年龄"})
    age: number
}