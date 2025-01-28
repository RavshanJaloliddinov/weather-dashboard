import { BaseEntity } from "src/common/database/BaseEntity"
import { Column, Entity } from "typeorm"

@Entity("user")
export class UserEntity extends BaseEntity {

    @Column({
        name: "name",
        type: "varchar",
    })
    name: string

    @Column({
        name: "surname",
        type: "varchar",
    })
    surname: string

    @Column({
        name: "username",
        type: "varchar",
    })
    username: string

    @Column({
        name: "password",
        type: "varchar",
        default: Date.now(),
    })
    password: string
}