const server = require ('../../server'),
    chai = require ('chai'),
    faker = require ('faker');

    module.exports =(data)=>{
        it('Check the login without parameters',(done)=>{
            
            chai.request(server)
            .post('/api/auth/login')
            .end((err,res)=>{
                // check for response-status-code
                res.should.have.status(200);

                // check response type
                res.body.should.be.a('object');

                // check for resposnse properties
                res.body.should.have.property('statusMessage').eql('Parameters are missing!');

                // callback
                done();
            })
        })  

        it('Check login with only username parameter!', (done) => {
            // design request payload for signup post-params
            // send requet as post and append payload
            chai.request(server)
            .post('/api/auth/login')
            .send({username:data.username})
            .end((err, res) => {
                // check for response-status-code
                res.should.have.status(200);
    
                // check response type
                res.body.should.be.a('object');
    
                // check for resposnse properties
                res.body.should.have.property('statusMessage').eql('Parameters are missing!');
                // res.body.should.have.property('data');
    
                // callback
                done();
            });
        });

        it('Check login with only password parameter!', (done) => {
            // design request payload for signup post-params
            // send requet as post and append payload
            chai.request(server)
            .post('/api/auth/login')
            .send({password:data.password})
            .end((err, res) => {
                // check for response-status-code
                res.should.have.status(200);
    
                // check response type
                res.body.should.be.a('object');
    
                // check for resposnse properties
                res.body.should.have.property('statusMessage').eql('Parameters are missing!');
                // res.body.should.have.property('data');
    
                // callback
                done();
            });
        });

        it('Check login with wrong username!', (done) => {
            // design request payload for signup post-params
            // send requet as post and append payload
            chai.request(server)
            .post('/api/auth/login')
            .send({username:faker.internet.userName(),password:data.password})
            .end((err, res) => {
                // check for response-status-code
                res.should.have.status(200);
    
                // check response type
                res.body.should.be.a('object');
    
                // check for resposnse properties
                res.body.should.have.property('statusMessage').eql('Entered username does not exist.');
                // res.body.should.have.property('data');
    
                // callback
                done();
            });
        });

        return new Promise (resolve => {
            it('check login. Success!', (done) => {
                chai.request(server)
                .post('/api/auth/login')
                .send({username:data.username,password:data.password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('statusMessage').eql('You have sucessfully Logged in');
                    res.body.should.have.property('result');
                    // res.body.data.should.have.property('user_id');
                    resolve ({token: res.body['x-access-token'],data:res.body.result});
                    done();
                });
            });
        })
    }