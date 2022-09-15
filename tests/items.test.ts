import supertest from 'supertest'
import {prisma} from '../src/database'

import app from '../src/app'
import { send } from 'process';

import {Itenfake} from'./factoriesItens'

describe('Testa POST /items ', () => {

  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE items;`;
  });

  it('Deve retornar 201, se cadastrado um item no formato correto', async()=>{

    const body = await Itenfake()



    const result = await supertest(app).post('/items').send(body)



    expect(result.status).toEqual(201)
  });

  it('Deve retornar 409, ao tentar cadastrar um item que exista',async()=>{

    const body = await Itenfake()

    await supertest(app).post('/items').send(body)
    const result = await supertest(app).post('/items').send(body)



    expect(result.status).toEqual(409)

})

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array',async()=>{

  const result = await supertest(app).get('/items').send()

  console.log(result.body)
  expect(result.status).toEqual(200)
  expect(result.body).toEqual([])
  
});

})


  it('Deve retornar status 404 caso não exista um item com esse id',async()=>{

    const result = await supertest(app).get('/items/5').send()
    expect(result.status).toEqual(404)

  })
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado',async()=>{

    const body = await Itenfake()

    const id = await supertest(app).post('/items').send(body)


    const result = await supertest(app).get('/items/45').send()

      console.log(result.body)

      const ResiltBody = result.body
      delete ResiltBody.id

      expect(result.status).toEqual(200)
      expect(ResiltBody).toEqual(body)
  })





})
