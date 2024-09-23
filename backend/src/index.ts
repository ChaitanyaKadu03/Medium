import { Hono } from 'hono'
import Signup from './Routes/User/signup'
import Signin from './Routes/User/signin'
import Blog_bulk from './Routes/Blog/blog.bulk'
import Blog_id from './Routes/Blog/blog.id'
import Blog_post from './Routes/Blog/blog.post'
import Blog_put from './Routes/Blog/blog.put'

const app = new Hono();

app.route('/api/v1/user/signup', Signup)
app.route('/api/v1/user/signin', Signin)
app.route('/api/v1/blog/bulk', Blog_bulk)
app.route('/api/v1/blog', Blog_id)
app.route('/api/v1/blog', Blog_post)
app.route('/api/v1/blog', Blog_put)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
