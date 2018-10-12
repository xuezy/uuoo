# zhyyt_front
智慧营业厅前端 仓库

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

# 项目权限


#项目模块介绍
app
  - fonts
  - images
  - scripts
  - styles
  - views
    - common
      - pay 支付
        - payway 支付方式(微信支付，支付宝支付，云闪付，现金支付，刷卡支付)
        - payResult 支付结果(支付成功，支付失败，支付超时)
      - sendEmail 发送邮件
      - makeCard 制作sim卡
      - readIDCard 身份证读取
      - readFace 人脸识别
    - home 首页
    - layout
    - login 登录
    - main
    - openAccount 开户入网
    - 补换卡
    - 充值缴费
    - 套餐办理
  - index.html
