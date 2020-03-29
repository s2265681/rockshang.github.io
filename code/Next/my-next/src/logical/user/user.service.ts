import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
import { makeSalt, encryptPassword } from'../../utils/cryptogram'; // 引入加密函数

@Injectable()

export class UserService {
  /**
  * 查询是否有该用户
  * @param username 用户名
  */
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id id, real_name realName, role
      FROM
        admin_user
      WHERE
        account_name = '${username}'
    `; // 一段平淡无奇的 SQL 查询语句
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
      });
      const user = res[0]; // 查出来的结果是一个数组，我们只取第一个。
      if (user) {
        return {
          code: 200, // 返回状态码，可自定义
          data: {
            user,
          },
          msg: 'Success',
        };
      } else {
        return undefined
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if(password !== repassword){
      return {
        code: 400,
        msg: '两次密码输入不一致',
      }
    }
    const user = await this.findOne(accountName);
    console.log(accountName,'accountName')
    console.log(user,'user')
    if(user){
      return {
        code: 400,
        msg: '用户已经存在',
      }
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt);  // 加密密码
    const registerSQL = `
    INSERT INTO admin_user
      (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
    VALUES
      ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
  `;
  try {
    await sequelize.query(registerSQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  } catch (error) {
    return {
      code: 503,
      msg: `Service error: ${error}`,
    };
   }
  }
}