const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server'),
    should = chai.should(),
    connection = require ('../Utilities/mongooseConfig'),
    cases = require ('./integration/index');

chai.use(chaiHttp);

describe('Init', function () {
    it('check app status', function (done) {
        chai.request(server).get('/').end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            done();
        })
    });

    describe('/signup', () => cases.signup().then((response)=>{
        let admin = response.user;
         describe('/login', () => cases.login(admin).then (token => {
            describe('/profile', () => cases.profile(token));
         }))
    })
    );

});