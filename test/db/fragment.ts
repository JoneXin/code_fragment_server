import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from 'sequelize-typescript';

export interface fragmentAttributes {
    uid: number;
    category?: string;
    title?: string;
    desc?: string;
    content?: string;
}

@Table({ tableName: 'fragment', timestamps: false })
export class fragment extends Model<fragmentAttributes, fragmentAttributes> implements fragmentAttributes {
    @Column({ primaryKey: true, type: DataType.INTEGER })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    uid!: number;

    @Column({ allowNull: true, type: DataType.STRING(255), comment: '分类' })
    category?: string;

    @Column({ allowNull: true, type: DataType.STRING(255), comment: '标题' })
    title?: string;

    @Column({ allowNull: true, type: DataType.STRING, comment: '描述' })
    desc?: string;

    @Column({ allowNull: true, type: DataType.STRING, comment: '内容' })
    content?: string;
}
