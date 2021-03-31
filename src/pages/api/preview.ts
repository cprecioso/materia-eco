import type { NextApiHandler } from "next"

type Query = { secret: string; slug?: string }

const handler: NextApiHandler = async (req, res) => {
  const { secret, slug } = req.query as Query

  if (secret !== process.env.PREVIEW_MODE_SECRET || !slug) {
    return res.status(401).json({ message: "Invalid token" })
  }

  res.setPreviewData({})

  res.redirect(slug)
}

export default handler
