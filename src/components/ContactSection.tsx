"use client";

export default function ContactSection() {
  return (
    <section className="bg-black text-white px-6 py-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-[clamp(40px,6vw,80px)] font-extrabold leading-none mb-6">
            Get in Touch
          </h2>

          <p className="text-zinc-400 max-w-md mb-10">
            Have a project in mind? We're here to help. Reach out through any of
            the channels below or fill out the form and we'll get back to you
            within 24 hours.
          </p>

          {/* CONTACT INFO */}
          <div className="space-y-6 text-sm">
            <div>
              <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">
                Email us
              </p>
              <p className="text-white text-lg">hello@huespire.com</p>
            </div>

            <div>
              <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">
                Call us
              </p>
              <p className="text-white text-lg">+1 (234) 567-890</p>
            </div>

            <div>
              <p className="text-zinc-500 uppercase tracking-widest text-xs mb-1">
                Location
              </p>
              <p className="text-white text-lg">Global — Working Remotely</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-2">Book a Strategy Call</h3>
            <p className="text-zinc-400 mb-4 max-w-sm">
              Schedule a free 30-minute call to discuss your project and get
              expert advice.
            </p>

            <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
              Schedule Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
          <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>

          <form className="space-y-5">
            {/* NAME */}
            <div>
              <label className="text-sm text-zinc-400">Your Name *</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full mt-2 bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-zinc-400">Email Address *</label>
              <input
                type="email"
                placeholder="john@company.com"
                className="w-full mt-2 bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white"
              />
            </div>

            {/* COMPANY */}
            <div>
              <label className="text-sm text-zinc-400">Company Name</label>
              <input
                type="text"
                placeholder="Your Company"
                className="w-full mt-2 bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white"
              />
            </div>

            {/* SERVICE */}
            <div>
              <label className="text-sm text-zinc-400">
                Service Interested In *
              </label>
              <select className="w-full mt-2 bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white">
                <option>Select a service</option>
                <option>Web Design</option>
                <option>Branding</option>
                <option>Development</option>
                <option>Marketing</option>
              </select>
            </div>

            {/* BUDGET */}
            <div>
              <label className="text-sm text-zinc-400">Estimated Budget</label>
              <select className="w-full mt-2 bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white">
                <option>Select budget range</option>
                <option>$1k - $5k</option>
                <option>$5k - $10k</option>
                <option>$10k+</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm text-zinc-400">Project Details *</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project, goals, and timeline..."
                className="w-full mt-2 bg-transparent border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-full font-medium hover:scale-[1.02] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
