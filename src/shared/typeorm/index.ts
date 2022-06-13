import { createConnection } from 'typeorm';

createConnection();

//docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
// comando para criar o postgres no docker
