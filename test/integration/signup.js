const server = require ('../../server'),
    chai = require ('chai'),
    faker = require ('faker');

    module.exports =()=>{
        it('Check the signup request with parameters',(done)=>{
            chai.request(server)
            .post('/api/auth/signup')
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

        it('Check and validate Signup route. Invalid Contact nnumber format!', (done) => {
            // design request payload for signup post-params
            const user = {
                fullName: faker.name.firstName(),
                email: faker.internet.email(),
                username:faker.internet.userName(),
                userType : 'student',
                password: faker.internet.password(),
                phone: faker.phone.phoneNumber()
            };
            console.log(user,'user data from contact number validation!!');
            // send request as post and append payload
            chai.request(server)
            .post('/api/auth/signup')
            .send(user)
            .end((err, res) => {
                // check for response-status-code
                res.should.have.status(200);
    
                // check response type
                res.body.should.be.a('object');
    
                // check for resposnse properties
                res.body.should.have.property('statusMessage').eql('invalid params');
                // res.body.should.have.property('data');
    
                // callback
                done(null, user);
            });
        });

        return new Promise (resolve => {
            it('Check and validate Signup route. Success!', (done) => {
                const user = {
                    fullName: faker.name.firstName(),
                    email: faker.internet.email(),
                    username:faker.internet.userName(),
                    password: faker.internet.password(),
                    phone: (faker.phone.phoneNumberFormat()).replace (/[^\d]/g, ''),
                    userType : 'student'
                };
                chai.request(server)
                .post('/api/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('statusMessage').eql('User registered successfully!');
                    res.body.should.have.property('data');
                    // res.body.data.should.have.property('user_id');
                    resolve ({user: user});
                    done();
                });
            });
        })
    }