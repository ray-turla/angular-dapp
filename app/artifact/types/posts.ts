export type Posts = {
  "version": "0.1.0",
  "name": "posts",
  "instructions": [
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "post",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "post",
          "type": {
            "defined": "Post"
          }
        }
      ]
    },
    {
      "name": "updatePost",
      "accounts": [
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "post",
          "type": {
            "defined": "Post"
          }
        }
      ]
    },
    {
      "name": "deletePost",
      "accounts": [
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "post",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "content",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "author",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: Posts = {
  "version": "0.1.0",
  "name": "posts",
  "instructions": [
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "post",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "post",
          "type": {
            "defined": "Post"
          }
        }
      ]
    },
    {
      "name": "updatePost",
      "accounts": [
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "post",
          "type": {
            "defined": "Post"
          }
        }
      ]
    },
    {
      "name": "deletePost",
      "accounts": [
        {
          "name": "post",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "author",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "post",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "content",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "createdAt",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "updatedAt",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "author",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
