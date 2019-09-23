import Mock from 'mockjs';

const Random = Mock.Random;

const success = () => {
    return {
        code: 200,
        msg: 'success',
    };
};

const login = () => {
    return {
        code: 200,
        msg: 'success',
        data: Random.string(16),
    };
};

Mock.mock('/login', 'post', login);
Mock.mock("/index", '*', success());
