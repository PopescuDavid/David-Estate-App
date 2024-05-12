import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const savedPosts = await prisma.savedPost.findMany({
            where: {
              userId: payload.id,
              postId: {
                in: posts.map(post => post.id),
              },
            },
          });

          const savedPostsMap = savedPosts.reduce((acc, savedPost) => {
            acc[savedPost.postId] = true;
            return acc;
          }, {});

          const postsWithSavedFlag = posts.map(post => ({
            ...post,
            isSaved: savedPostsMap[post.id] || false,
          }));

          res.status(200).json(postsWithSavedFlag);
        }
      });
    } else {
      const postsWithoutSavedFlag = posts.map(post => ({
        ...post,
        isSaved: false,
      }));

      res.status(200).json(postsWithoutSavedFlag);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false }); // Send response inside the jwt.verify callback
        }
      });
    } else {
      res.status(200).json({ ...post, isSaved: false }); // Send response outside of the if (token) block
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        savedPosts: true
      }
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    // Delete the associated SavedPosts first
    if (post.savedPosts.length > 0) {
      await Promise.all(post.savedPosts.map(async (savedPost) => {
        await prisma.savedPost.delete({
          where: { id: savedPost.id }
        });
      }));
    }

    // Delete the associated PostDetail if it exists
    if (post.postDetail) {
      await prisma.postDetail.delete({
        where: { id: post.postDetail.id }
      });
    }

    await prisma.post.delete({
      where: { id }
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};


