import { getLocalStore } from '@/utils/storage'
const inAuth = ['/cart', '/personal'];
const outAuth = ['/login', '/forgot', '/perfect'];

function every(list, { path }) {
    return list.every((field) => {
        return path.indexOf(field)
    });
}

export default ({ app, store }) => {
    // app.router.beforeEach((to, from, next) => {
        // const isClient = process.client;
        // if (isClient) {
        //     const token = store.state.token || getLocalStore('token');
        //     const authPath = token ? outAuth : inAuth;
        //     const pathValid = every(authPath, to);
        //     if (pathValid) {
        //         next()
        //     } else {
        //         const toPath = token ? '/' : '/login';
        //         next(toPath)
        //     }
        // } else {
        //     next()
        // }
    //     next()
    // })
}