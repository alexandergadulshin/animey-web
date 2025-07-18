import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './carousel.css';
import axios from 'axios';
import { FaHeart, FaStar } from 'react-icons/fa';

export default function Carousel({ animes }) {
  const swiperRef = useRef();
  const [desc, setDesc] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    const f = () => swiperRef.current?.swiper?.update();
    window.addEventListener('resize', f);
    document.addEventListener('fullscreenchange', f);
    return () => {
      window.removeEventListener('resize', f);
      document.removeEventListener('fullscreenchange', f);
    };
  }, []);

  useEffect(() => {
    if (!animes?.length) return;
    (async () => {
      const d = {};
      await Promise.all(animes.map(async a => {
        if (!a.synopsis) return;
        const s = a.synopsis.split('.').filter(Boolean);
        if (s.length === 1) {
          try {
            const { data: m } = await axios.get(`https://api.jikan.moe/v4/anime/${a.mal_id}/moreinfo`);
            const more = m.data.moreinfo?.split('.').filter(Boolean) || [];
            let base = a.synopsis.trim().replace(/\.$/, '');
            if (more.length > 1) d[a.mal_id] = base + '. ' + more.slice(0, 2).map(s => s.trim()).join('. ') + '.';
            else {
              try {
                const { data: ad } = await axios.get(`https://api.jikan.moe/v4/anime/${a.mal_id}`);
                const t = ad.data.themes?.map(t => t.name) || [];
                d[a.mal_id] = t.length
                  ? base + ' This anime explores theme' + (t.length > 1 ? 's' : '') + ' such as ' + t.join(t.length === 2 ? ' and ' : ', ') + '.'
                  : a.synopsis;
              } catch { d[a.mal_id] = a.synopsis; }
            }
          } catch { d[a.mal_id] = a.synopsis; }
        }
      }));
      setDesc(d);
    })();
  }, [animes]);

  useEffect(() => {
    if (!animes?.length) return;
    (async () => {
      const s = {};
      await Promise.all(animes.map(async a => {
        try {
          const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${a.mal_id}`);
          s[a.mal_id] = { score: data.data.score, favorites: data.data.favorites };
        } catch {}
      }));
      setStats(s);
    })();
  }, [animes]);

  return (
    <section>
      <div class="rounded-2xl my-5">
        <div class="overflow-hidden w-full max-w-full mx-auto">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            navigation
            loop
            spaceBetween={16}
            slidesPerView="auto"
            centeredSlides
            style={{ width: '100%' }}
            className="mySwiper"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={900}
            effect="slide"
            cssMode={false}
          >
            {animes?.map((a, i) => (
              <SwiperSlide key={a.mal_id || i} style={{ width: '100%', maxWidth: 640, height: 260 }}>
                <div
                  class="flex-shrink-0 bg-gray-800 bg-opacity-60 rounded-2xl shadow-lg transition p-2 flex flex-col h-full w-full group"
                  style={{ position: 'relative', transition: 'box-shadow 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 32px 8px rgba(168,85,247,0.7)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
                >
                  <div class="flex flex-row items-stretch w-full h-full">
                    <div class="flex flex-col flex-1 max-w-full pr-2 h-full" style={{ flexBasis: '66.666%' }}>
                      <div
                        class="text-white font-bold text-2xl w-full mb-2 text-left leading-tight"
                        style={{ fontFamily: 'Montserrat, sans-serif', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', letterSpacing: '0.01em' }}
                        title={a.title}
                      >
                        {a.title}
                      </div>
                      <div style={{ width: '95%', height: '3px', background: '#7c3aed', opacity: 0.35, borderRadius: '6px', margin: '0.05rem 0 0.7rem 0.25rem' }} />
                      <div
                        class="text-base text-left"
                        style={{ fontFamily: 'Inter, sans-serif', color: '#f3f4f6', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', whiteSpace: 'normal', lineHeight: '1.6' }}
                      >
                        {!a.synopsis ? 'No synopsis available.' : (a.synopsis.split('.').filter(Boolean).length === 1 && desc[a.mal_id]) ? desc[a.mal_id] : a.synopsis}
                      </div>
                      {((stats[a.mal_id]?.score != null) || (stats[a.mal_id]?.favorites != null) || (a.status === 'Not yet aired' && (a.aired?.from || a.aired?.string))) && (
                        <div style={{ position: 'absolute', left: 16, bottom: 16, zIndex: 3, display: 'flex', alignItems: 'center', gap: '0.7rem', background: 'rgba(24,24,32,0.7)', borderRadius: '8px', padding: '0.18rem 0.7rem', fontSize: '1rem', color: '#fff', fontWeight: 500, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)' }}>
                          {stats[a.mal_id]?.favorites != null && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><FaHeart style={{ color: '#ec4899', fontSize: '1.1em' }} />{stats[a.mal_id].favorites}</span>
                          )}
                          {stats[a.mal_id]?.score != null && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><FaStar style={{ color: '#fbbf24', fontSize: '1.1em' }} />{stats[a.mal_id].score}</span>
                          )}
                          {(((stats[a.mal_id]?.score == null) || (stats[a.mal_id]?.favorites == null)) && a.status === 'Not yet aired' && (a.aired?.from || a.aired?.string)) && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontStyle: 'italic', color: '#fbbf24' }}>
                              Scheduled: {(() => { const str = a.aired?.string || (a.aired?.from ? new Date(a.aired.from).toLocaleDateString() : 'TBA'); return typeof str === 'string' && str.includes('to') ? str.split('to')[0].trim() : str; })()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {a.images?.jpg?.image_url && (
                      <div class="relative flex items-stretch h-full" style={{ flexBasis: '33.333%', minWidth: 0 }}>
                        {(a.airing || a.type === 'Movie' || a.status === 'Not yet aired') && (
                          <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'flex-end' }}>
                            {a.status === 'Not yet aired' && (
                              <div style={{ background: '#f59e42', color: '#fff', fontWeight: 600, fontSize: '0.85rem', borderRadius: '8px', padding: '0.18rem 0.7rem', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Scheduled</div>
                            )}
                            {a.airing && (
                              <div style={{ background: '#ec4899', color: '#fff', fontWeight: 600, fontSize: '0.85rem', borderRadius: '8px', padding: '0.18rem 0.7rem', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Airing Now</div>
                            )}
                            {a.type === 'Movie' && (
                              <div style={{ background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: '0.85rem', borderRadius: '8px', padding: '0.18rem 0.7rem', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>Movie</div>
                            )}
                          </div>
                        )}
                        <img src={a.images.jpg.image_url} alt={a.title} class="rounded-lg object-cover h-full w-full" style={{ height: '100%' }} />
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '96px', pointerEvents: 'none', background: 'linear-gradient(to right, rgba(24,24,32,0.7) 18%, rgba(24,24,32,0.25) 65%, rgba(24,24,32,0) 100%)' }} />
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}