 import {faker} from '@faker-js/faker'


 export async function  Itenfake(){
     const item = {
         
         title: faker.word.adjective(10),
         url: faker.internet.url(),
         description: faker.hacker.phrase(),
         amount: 55
        }
        return item
}