import { Request, Response, Router } from "express";
import Post from "../models/Post";
/**
 * @apiDefine PostResponseParams
 * @apiSuccess {string} title
 * @apiSuccess {string} content
 * @apiSuccess {string} category
 * @apiSuccess {boolean} published
 */
export class PostRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // get all of the posts in the database
  /**
   * @api {GET} /posts/ Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup Posts
   *
   *
   * @apiSampleRequest /posts/
   *
   * @apiSuccessExample {json} Success-Response a JSON-Array<posts>:
   * {"data":[
   *  { "timestamp": "2018-03-29T13:44:27.979Z", "title": "Post1", "slug": "post1", "content": "algo contenido", "featuredImage": "imagen", "category": "category", "published": false, "_id": "5abcedbbfb5dfb236c199e81", "__v": 0 }, { "timestamp": "2018-03-29T13:45:17.776Z", "title": "Post4", "slug": "post2", "content": "algo contenido", "featuredImage": "imagen", "category": "category", "published": true, "_id": "5abcededfb5dfb236c199e83", "__v": 0 }
   * ]}
   */
  public all(req: Request, res: Response): void {
    Post.find()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.json({ error });
      });
  }

  // get a single post by params of 'slug'
  public one(req: Request, res: Response): void {
    const slug: string = req.params.slug;

    Post.findOne({ slug })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // create a new post
  public create(req: Request, res: Response): void {
    const title: string = req.body.title;
    const slug: string = req.body.slug;
    const content: string = req.body.content;
    const featuredImage: string = req.body.featuredImage;
    const category: string = req.body.category;
    const published: boolean = req.body.published;

    if (!title || !slug || !content) {
      res.status(422).json({ message: "All Fields Required." });
    }

    const post = new Post({
      title,
      slug,
      content,
      featuredImage,
      category,
      published
    });

    post
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // update post by params of 'slug'
  public update(req: Request, res: Response): void {
    const slug: string = req.body.slug;

    Post.findOneAndUpdate({ slug }, req.body)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // delete post by params of 'slug'
  public delete(req: Request, res: Response): void {
    const slug: string = req.body.slug;

    Post.findOneAndRemove({ slug })
      .then(() => {
        res.status(204).end();
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public routes() {
    this.router.get("/", this.all);
    this.router.get("/:slug", this.one);
    this.router.post("/", this.create);
    this.router.put("/:slug", this.update);
    this.router.delete("/:slug", this.delete);
  }
}
/*
const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;*/
