import { Context } from 'koa';

export default class ArticleController {
  public static async listArticle(ctx: Context) {
    ctx.body = 'listArticle controller';
  }

  public static async getArticle(ctx: Context) {
    ctx.body = `getArticle controller with ID = ${ctx.params.id}`;
  }

  public static async addArticle(ctx: Context) {
    ctx.body = `addArticle controller with article = ${JSON.stringify(ctx.request.body)}`;
  }

  public static async updateArticle(ctx: Context) {
    ctx.body = `updateArticle controller with article = ${JSON.stringify(ctx.request.body)}`;
  }

  public static async deleteArticle(ctx: Context) {
    ctx.body = `deleteArticle controller with ID = ${ctx.params.id}`;
  }
}
