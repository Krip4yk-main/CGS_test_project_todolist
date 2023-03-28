import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('todo', {})
export class Todo extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, (user) => user.id, { cascade: true, eager: true })
	@JoinColumn({ name: 'userId', referencedColumnName: 'id' })
	@Column({ nullable: false })
	userId: number;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: true })
	details: string;

	@Column({ nullable: false, default: true })
	private: boolean;

	@Column({ nullable: false, default: false })
	done: boolean;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
	updated_at: Date;
}
