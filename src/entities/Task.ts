import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id?: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    title?: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description?: string;

    @Column({
        type: 'boolean',
        nullable: false,
        default: false,
    })
    completed?: boolean;
}
