import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Customer from '@modules/customers/typeorm/entities/Customer';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //junção de um clinte para muitas ordens
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'cusatomer_id' })
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
