import { Router } from "express"
import { User } from "../models/User"

const router = Router()

// ✅ Alle users ophalen
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err })
  }
})

// ✅ Eén user ophalen
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err })
  }
})

// ✅ User aanmaken
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body
    const user = new User({ name, email })
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err })
  }
})

// ✅ User verwijderen
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json({ message: "User deleted" })
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err })
  }
})

export default router
