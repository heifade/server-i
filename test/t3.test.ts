import * as request from 'supertest';
import * as express from "express";
import { Server } from "http";
import "mocha";
 
const app = express();
 
app.get('/user', (req: express.Request, res: express.Response) => {
  res.status(200).json({ name: 'tobi' });
});

describe("exec", function() {

    
  
   

    it("ex", (done) => {
        request(app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '15')
        .expect(200)
        .end((err: any, res: request.Response) => {
            console.log(err, res.body);
          done();
        });
    })

});
 
