const { User } = require("../models/user.model");
const { Client } = require("@elastic/elasticsearch");

const client = new Client({ node: "http://localhost:9200" });

async function createIndex() {
  try {
    await client.indices.delete({ index: "users" });
    console.log("Index 'users' deleted successfully");
  } catch (error) {
    // Ignore error if index doesn't exist
    if (error.statusCode !== 404) {
      console.error("Error deleting index:", error);
      throw error;
    }
  }

  try {
    await client.indices.create({
      index: "users",
      body: {
        mappings: {
          properties: {
            name: { type: "text" },
            title: { type: "text" },
            description: { type: "text" },
            location: { type: "text" },
            experience: {
              type: "nested",
              properties: {
                role: { type: "text" },
                organization: { type: "text" },
              },
            },
            education: {
              type: "nested",
              properties: {
                name: { type: "text" },
                specialize: { type: "text" },
              },
            },
          },
        },
      },
    });
    console.log("Index 'users' created successfully");
  } catch (error) {
    console.error("Error creating index:", error);
    throw error; // Rethrow the error for handling in the caller function
  }
}

async function indexUsers() {
  try {
    // Fetch data from MongoDB
    const users = await User.find().lean();

    // Create index in Elasticsearch if it doesn't exist
    await createIndex();

    // Index each document into Elasticsearch
    for (const user of users) {
      await indexUser(user);
    }

    console.log("Indexing completed");
  } catch (error) {
    console.error("Error indexing users:", error);
  }
}

async function indexUser(user) {
  const userId = user._id ? user._id.toString() : undefined;
  delete user._id;
  try {
    await client.index({
      index: "users",
      body: {
        userId,
        ...user,
      },
    });
    console.log(`User ${user.name} indexed successfully`);
  } catch (error) {
    console.error(`Error indexing user ${user._id}:`, error);
  }
}

async function searchUsers(query) {
  try {
    const body = await client.search({
      index: "users",
      body: {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query: query,
                  fields: ["name", "title", "description", "location"],
                },
              },
              {
                nested: {
                  path: "education",
                  query: {
                    multi_match: {
                      query: query,
                      fields: ["education.name", "education.specialize"],
                      minimum_should_match: "75%",
                    },
                  },
                },
              },
              {
                nested: {
                  path: "experience",
                  query: {
                    multi_match: {
                      query: query,
                      fields: ["experience.organization", "experience.role"],
                      minimum_should_match: "75%",
                    },
                  },
                },
              },
            ],
          },
        },
      },
    });

    // Check if hits are available
    if (body.hits && body.hits.hits) {
      console.log("Search results:", body.hits.hits);
      return body.hits.hits.map((hit) => hit._source);
    } else {
      console.error("No hits found in the search response");
      return [];
    }
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
}

indexUsers()
  .then(() => {
    console.log("Elasticsearch index created successfully");
  })
  .catch((error) => {
    console.error("Error creating Elasticsearch index:", error);
  });

module.exports = { searchUsers };
