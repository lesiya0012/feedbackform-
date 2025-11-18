import { useState } from "react";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    rating: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/feedback", formData);
      console.log("Response:", res.data);
      alert("Feedback submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback");
    }
  };


  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Valid email required.";
    if (!form.category) err.category = "Choose a category.";
    if (!form.rating) err.rating = "Select a rating.";
    if (form.message.trim().length < 10) err.message = "Message must be at least 10 characters.";
    if (!form.consent) err.consent = "Consent is required.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Simulate API call
    console.log("Submitted:", form);
    setSuccess(true);
    setForm({ name: "", email: "", category: "", rating: "", message: "", consent: false });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-6">
      <div className="w-full max-w-xl bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-2">💬 Share Your Feedback</h1>
        <p className="text-sm text-gray-400 mb-4">We value your thoughts and ideas.</p>

        {success && (
          <div className="mb-4 rounded-lg bg-green-700/20 border border-green-600 p-3 text-green-300">
            ✅ Thank you! Your feedback has been submitted.
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={update}
              className="mt-1 w-full rounded-lg bg-gray-700 border border-gray-600 p-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Your full name"
            />
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={update}
              className="mt-1 w-full rounded-lg bg-gray-700 border border-gray-600 p-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={update}
              className="mt-1 w-full rounded-lg bg-gray-700 border border-gray-600 p-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="general">General Feedback</option>
            </select>
            {errors.category && <p className="text-xs text-red-400">{errors.category}</p>}
          </div>

          {/* Rating */}
          <fieldset>
            <legend className="block text-sm font-medium">Rating</legend>
            <div className="mt-2 flex gap-4">
              {[1, 2, 3, 4, 5].map((r) => (
                <label key={r} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="rating"
                    value={r}
                    checked={form.rating === String(r)}
                    onChange={update}
                    className="text-indigo-500 focus:ring-indigo-500"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
            {errors.rating && <p className="text-xs text-red-400">{errors.rating}</p>}
          </fieldset>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={update}
              rows="4"
              className="mt-1 w-full rounded-lg bg-gray-700 border border-gray-600 p-2 focus:ring-2 focus:ring-indigo-500"
              placeholder="Tell us what worked, what didn’t, and what we can improve."
            />
            {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
          </div>

          {/* Consent */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={update}
              className="mt-1 h-4 w-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500"
            />
            <span className="text-sm">I agree to be contacted about my feedback.</span>
          </div>
          {errors.consent && <p className="text-xs text-red-400">{errors.consent}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onSubmit={handleSubmit}
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setForm({ name: "", email: "", category: "", rating: "", message: "", consent: false });
                setErrors({});
              }}
              className="rounded-lg bg-gray-600 px-4 py-2 text-gray-200 hover:bg-gray-500"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}