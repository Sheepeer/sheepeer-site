import mysql from 'mysql2'
import { GET_POSTS_SQL } from './sqls'

class Mysql {
  private connection

  constructor() {
    this.connection = mysql.createConnection({
      host: '43.143.198.224',
      port: 3306,
      user: 'root',
      password: 'Sheepeer0719',
      database: 'sheepeer'
    })
  }

  public getPosts = () => {
    let res: {result: any} = {result: null}
    this.connection.query(
      GET_POSTS_SQL,
      function (err, result, fields) {
        console.log(err, result, fields)
        res.result = result
      }
    )
    return res
  }
}

export default Mysql
