import { NODE_ENV } from './environment'
const config = {
    development: {
        server: {
            port: 3030,
            host: 'localhost'
        },
        baseUrl: {
            domain: 'http://localhost:3030/api/',
            phpDomain: 'http://elanmai.com/api.php?c=',
            imagePath: '',
            chatDomain: ''
        },
        timeout: 6000,
        db: {
            port: 27017,
            host: 'localhost',
            dbname: 'queenguest',
            user: '',
            pass: ''
        }
    },
    production: {
        server: {
            port: 3030,
            host: '127.0.0.1'
        },
        baseUrl: {
            domain: 'http://localhost:3030/api/',
            phpDomain: 'http://elanmai.com/api.php?c=',
            imagePath: '',
            chatDomain: ''
        },
        timeout: 6000,
        db: {
            port: 27017,
            host: '127.0.0.1',
            dbname: 'queenguest',
            user: 'admin',
            pass: '123456'
        }
    }
}
export default config[NODE_ENV]