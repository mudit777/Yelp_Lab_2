'use strict';
var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

var email = "a" + Math.random() + "@gmail.com"
describe('Yelp', function(){

    describe("Customer Signup Test", () => {

        it("Customer Already Exists", () => {
            agent.post("/registerUser")
                .send({ first_name: "Udit",
                        last_name: "Marolia",
                        email: "udit@gmail.com",
                        password: "admin",
                        zip_code:95126,
                        day : 14,
                        month : "March",
                        year : "1997",
                        user_type : "customer"})
                .then(function (res) {
                    expect(res.status).to.equal(299);
                })
                .catch(error => {
                    console.log(error);
                });
        });

        it("Successful Customer Signup", () => {
            agent.post("/registerUser")
                .send({ first_name: "Udit",
                    last_name: "Marolia",
                    email: email,
                    password: "admin",
                    zip_code:95126,
                    day : 14,
                    month : "March",
                    year : "1997",
                    user_type : "customer"})
                .then(function (res) {
                    expect(res.status).to.equal(200);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });
    describe("Get User Details", () => {
        it("Get User Details", () => {
            agent.post("/getUserDetails")
                .send({
                    UserId : 7
                })
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe("Search dish name and restraurant name", () => {
        it("Search", () => {
            agent.post("/finalFilter")
                .send({
                    search : "chicken"
                })
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe("Filter CustomerOrders", () => {
        it("Search", () => {
            agent.post("/filterCustomerOrders")
                .send({
                    filter : "past"
                })
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
    describe("Get all Events", () => {
        it("Search", () => {
            agent.post("/getEvents")
                .then((res) => {
                    expect(res.status).to.equal(200)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })
})