import { BaseEntity } from 'src/common/database/BaseEntity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WeatherEntity extends BaseEntity {
    @Column()
    name: string; 

    @Column()
    country: string;

    @Column('float')
    lat: number;

    @Column('float')
    lon: number;

    @Column('float')
    temp_c: number;

    @Column({ nullable: true })
    temp_color: string; // Harorat rangi (databasedan keladi)

    @Column('float')
    wind_kph: number;

    @Column({ nullable: true })
    wind_color: string; // Shamol tezligi rangi (databasedan keladi)

    @Column('float')
    cloud: number;

    @Column({ nullable: true })
    cloud_color: string; // Bulut qoplami rangi (databasedan keladi)
}