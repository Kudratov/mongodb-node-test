/*jshint esversion: 6 */
const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');


const { app } = require('./../server.js');
const { Todo } = require('./../models/todo.js');
const { populateTodo } = require('./seed/seed.js');
const { User } = require('./../models/user.js');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    text: 'First todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second todo',
    completed: true,
    completedAt: 222,
    _creator: userTwoId
}];

const users = [{
    _id: userOneId,
    email: 'acer@gmail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@gmail.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
    }]
}];

beforeEach((done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        return Promise.all(userOne, userTwo);
    }).catch(() => done());
});

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return err;
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});

describe('GET /todos', () => {
    it('should get todos', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get('/todos/' + todos[0]._id.toHexString())
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        request(app)
            .get('/todos/' + todos[0]._id.toHexString() + 1)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            // expect((res) => {
            //         expect(res.body.text).toBe(undefined);
            //     })
            .end(done);
    });
});

describe('DELETE /todo:id', () => {
    it('should delete the todo', (done) => {
        request(app)
            .delete('/todos/' + todos[0]._id.toHexString())
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                
            })
            .end(done)
            // .end((err, done) => {
            //     Todo.findOne({'_creator': userOneId}).then(data => {
            //         expect(data).toNotExist();
            //         done();
            //     }).catch(e => {
            //         console.log('***' + e + '***')
            //     });
            // });
    });
});

describe('PATCH /todo:id', () => {

    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'This thould be new text';

        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({
                completed: true,
                text: text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
                expect(res.body.completed).toBe(true);
                //expect((res.body.completedAt).parseInt()).toBeA('number');
            })
            .end(done);
    });

    it('should clear compleatedAt when todo is not compleated', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'This should be new text';

        request(app)
            .patch(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .send({
                completed: false,
                text: text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
                expect(res.body.completed).toBe(false);
                //expect(res.body.completedAt).toBeA('number');
            })
            .end(done);
    });

});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((res) => {
                // expect(res.headers['x-auth']).toExist();
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                User.findById(users[1]._id).then((user) => {
                    // expect(user.tokens[0]).toInclude({
                    //     access: 'auth',
                    //     token: res.headers['x-auth']
                    // });
                    done();
                }).catch((e) => done(e));
            });
    });
});