const DataLoader = require("dataloader")
const Book = require("../models/book")

const createBookCountLoader = () =>
  new DataLoader(async (authorIds) => {
    // Fetch counts grouped by author in a single DB query
    const books = await Book.aggregate([
      { $match: { author: { $in: authorIds } } },
      { $group: { _id: "$author", count: { $sum: 1 } } },
    ])

    const bookCountMap = {}
    books.forEach((b) => {
      bookCountMap[b._id.toString()] = b.count
    })

    // Return counts in the same order as authorIds
    return authorIds.map((id) => bookCountMap[id.toString()] || 0)
  })

module.exports = createBookCountLoader
