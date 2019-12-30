const server = require ('../../server'),
    chai = require ('chai'),
    faker = require ('faker');

    module.exports =(data)=>{    
    it('get profile detail without token',(done)=>{
            
        chai.request(server)
        .get('/api/profile/get-profile-detail')
        .end((err,res)=>{
            // check for response-status-code
            res.should.have.status(403);

            // check response type
            res.body.should.be.a('object');

            // check for resposnse properties
            res.body.should.have.property('statusMessage').eql('Auth token is not supplied');

            // callback
            done();
        })
    })  

    it('get profile detail without user id',(done)=>{
            
        chai.request(server)
        .get('/api/profile/get-profile-detail')
        .set('content-type', 'application/json')
        .set('x-access-token',data.token)
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

    it('get profile detail with user id. Success!',(done)=>{
        // console.log(data.data,'data result!!!');
        chai.request(server)
        .get('/api/profile/get-profile-detail?userType=student&_id='+data.data._id)
        .set('content-type', 'application/json')
        .set('x-access-token',data.token)
        .end((err,res)=>{
            // check for response-status-code
            res.should.have.status(200);

            // check response type
            res.body.should.be.a('object');

            // check for resposnse properties
            res.body.should.have.property('statusMessage').eql('success');

            // callback
            done();
        })
    }) 
}