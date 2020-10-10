import { NODE_ENV } from './environment'
const config = {
    development: {
        server: {
            port: 3001,
            host: 'localhost'
        },
        baseUrl: {
            domain: 'http://localhost:3001/api/',
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
            port: 3001,
            host: '127.0.0.1'
        },
        baseUrl: {
            domain: 'http://45.77.135.130/api/',
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