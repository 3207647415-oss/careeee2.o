# Backend — 数据采集服务

## 说明

职路导航主应用为纯前端单文件架构，`frontend/index.html` 已内联所有数据。本目录存放**数据采集与刷新工具**，用于定期从官方渠道获取最新的院校分数线、报录比、省考时间等数据，更新前端内联数据。

## 文件

| 文件 | 用途 |
|---|---|
| `crawler_official_data.py` | 从高校研究生院官网、省人事考试网抓取最新数据 |
| `requirements-crawler.txt` | Python 依赖清单 |

## 使用

```bash
pip install -r requirements-crawler.txt
python crawler_official_data.py
```

## 未来可扩展

若需要支持多用户测评结果存储、院校库后台管理，可在本目录下引入 NestJS + Prisma 构建后端 API，对标参考项目 `CiKeZhang/KNOWLSLE` 的 `backend/` 结构：

```
backend/
├── src/
│   ├── auth/            鉴权
│   ├── quiz/            测评题目、会话、评分
│   ├── industry/        行业数据
│   ├── major/           专业数据
│   ├── university/      院校库 + 匹配接口
│   ├── civil-service/   省考数据
│   └── common/          过滤器、拦截器、工具
└── prisma/
    └── schema.prisma    数据模型
```
