"use client"
import React, { useState } from "react"
import { useAuth } from "../Context/UserContext" // جايب منها بيانات المستخدم الحالي

export default function UserProfileForm() {
  const { user, setUser , updateUser } = useAuth() // جاي من AuthContext
  const [formData, setFormData] = useState({
    Name: user?.Name || "",
    gender: user?.gender || "",
    preferredReciter: user?.preferredReciter || "",
    location: user?.location || "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await updateUser(user._id, formData)
      setUser(res.user) // تحديث الكونتكست
      setMessage("✅ Profile updated successfully!")
    } catch (err) {
      setMessage("❌ Error updating profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-5 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-slate-700 dark:text-slate-200">
        Edit Profile
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Preferred Reciter */}
      <div>
        <label className="block text-sm font-medium">Preferred Reciter</label>
        <select
          name="preferredReciter"
          value={formData.preferredReciter}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800"
        >
          <option value="">Choose a reciter</option>
          <option value="minshawi">Minshawi</option>
          <option value="afasy">Mishary Al Afasy</option>
          <option value="husary">Husary</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 border rounded-lg dark:bg-slate-800"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-bold"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {message && (
        <p className="text-center mt-2 text-sm text-slate-600 dark:text-slate-300">
          {message}
        </p>
      )}
    </form>
  )
}
