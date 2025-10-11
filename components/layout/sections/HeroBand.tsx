'use client';

export default function HeroBand(){
  return (
    <section className="relative w-full h-[min(100svh,100vh)] overflow-hidden">
      {/* Gradient + optional wave background behind video */}
      <div className="absolute inset-0 -z-20"
           style={{
             background:
               'radial-gradient(1200px circle at 20% 20%, rgba(194,24,91,0.60), transparent 60%),' +
               'radial-gradient(1000px circle at 80% 30%, rgba(64,196,180,0.50), transparent 60%),' +
               'radial-gradient(900px circle at 50% 80%, rgba(212,175,55,0.35), transparent 60%)'
           }} />
      {/* If you want the wave blended under the video, keep this div; remove if not needed */}
      <div className="absolute inset-0 -z-10"
           style={{
             backgroundImage: 'url(/brand/waves/waves-bg.webp)',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             opacity: 0.35
           }} />

      {/* 4K video with poster; if blocked or missing, gradient + wave remain visible */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/dental-hero-4k.mp4" type="video/mp4" />
      </video>

      {/* Copy */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: 'Montserrat, ui-sans-serif' }}
          >
            <span className="bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37] bg-clip-text text-transparent">
              Luxury Coastal Dentistry
            </span>
          </h1>
          <p
            className="mt-5 text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed"
            style={{ fontFamily: 'Lora, ui-serif' }}
          >
            Advanced, anxiety-free care with 3-D digital precision in Shoreham-by-Sea.
          </p>
        </div>
      </div>
    </section>
  );
}
