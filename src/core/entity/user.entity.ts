import { BaseEntity } from "src/common/database/BaseEntity"
import { UserRoles } from "src/common/database/Enums"
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
        unique: true,
    })
    username: string

    @Column({
        name: "password",
        type: "varchar",
        default: Date.now(),
    })
    password: string;

    @Column({
        name: "role",
        type: "enum",
        enum: UserRoles,
        default: UserRoles.user,
    })
    role: UserRoles;
}