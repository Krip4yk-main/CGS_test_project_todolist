import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user', {})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, nullable: false })
	email: string;

	@Column({ nullable: false })
	password: string;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
	updated_at: Date;
}
