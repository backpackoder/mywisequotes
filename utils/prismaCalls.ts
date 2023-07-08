export const PRISMA_CALLS = {
  quotes: {
    include: {
      createdBy: true,
      updatedBy: true,
      translations: true,
      tags: {
        include: {
          translations: true,
        },
      },
      author: {
        include: {
          translations: true,
        },
      },
      favorites: true,
      favoritedBy: true,
      comments: {
        include: {
          user: true,
          likes: {
            include: {
              user: true,
              replies: {
                include: {
                  user: true,
                  likes: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          },
          replies: {
            include: {
              user: true,
              likes: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  },

  authors: {
    include: {
      quotes: {
        include: {
          translations: {
            include: {
              language: true,
            },
          },
          author: {
            include: {
              translations: {
                include: {
                  language: true,
                },
              },
            },
          },
        },
      },
      translations: {
        include: {
          language: true,
        },
      },
    },
  },
};
