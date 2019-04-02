# 贡献指南

* fork主仓库到个人的github
* clone个人仓库地址到本地
* code建立分支进行开发
* commit & push将更改好的代码提交并上传到自己的仓库地址
* 提交pull request提交到主仓库master分支

**注意**：在提交合并代码请求的时候，ci会自动跑单元测试和e2e测试并且只有测试通过后的代码才有可能会被合并
你可以在上传代码之前在本地手动测试一下，命令如下

```bash
npm run test && npm run cypress:ci
```

如果新特性影响了之前的测试用例，请将新代码的测试用例同步更新，期待您的参与。